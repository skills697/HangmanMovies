import { Injectable, signal, computed} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Key, KeyPress, KeyboardKeys } from './keys';

export interface HangmanState {
  keys: Key[];
  title: HangmanLetter[];
  guessesRemaining: number;
  victory: boolean;
  ended: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class HangmanControllerService {
  
  private state = signal<HangmanState>({
    keys: KeyboardKeys.map((keyVal) => { return {id: keyVal, pressed: false}}),
    title: [],
    guessesRemaining: 6,
    victory: false,
    ended: true,
    error: null,
  });
  
  // selectors
  keys = computed(() => this.state().keys);
  title = computed(() => this.state().title);
  guessesRemaining = computed(() => this.state().guessesRemaining);
  victory = computed(() => this.state().victory);
  ended = computed(() => this.state().ended);
  error = computed(() => this.state().error);

  // sources
  newGame$ = new Subject();
  keyPress$ = new Subject<KeyPress>();
  titleSet$ = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { 
    // reducers
    this.newGame$.pipe(takeUntilDestroyed()).subscribe(() => {
      const fetchTitle = this.http.get("/api/movie-title", { responseType: 'text' });
      fetchTitle.subscribe({
        next: (resp) => this.titleSet$.next(resp),
        error: (err) => this.state.update((state) => ({...state, error: err}))
      });
    });
    
    this.titleSet$.pipe(takeUntilDestroyed()).subscribe((newTitle) => {
      this.state.update((state) => ({
        ...state,
        guessesRemaining: 6,
        keys: state.keys.map((key) => { return {id: key.id, pressed: false}}),
        title: this.getTitle(newTitle),
        ended: false,
        victory: false
      }));
    });
    
    this.keyPress$.pipe(takeUntilDestroyed()).subscribe((keyUpdate) => {
      var newPress = false;
      var foundKey = false;
      var won = false;
      const keySet = this.state().keys.map((key) => {
       if (key.id == keyUpdate.id) {
         newPress = !key.pressed;
         return {...key, pressed: true};       
       } 
       return key
      });
      if (newPress) {
        this.state().title.map((c) => {
          foundKey = (c.checkCharacter(keyUpdate.id)) ? true : foundKey;
          return c;
        });
        if(foundKey){
          won = this.state().title.reduce((acc, val) => {return (val.display) ? acc : false}, true);
        }
      }
      const guessRem = this.state().guessesRemaining - ((foundKey) ? 0 : 1);
      this.state.update((state) => ({
        ...state,
        keys: keySet,
        guessesRemaining: guessRem,
        victory: won,
        ended: (won || guessRem <= 0) ? true : state.ended
      }));
    });
  }
  
  getTitle(inputTitle: string): HangmanLetter[] {
    const title:HangmanLetter[] = [];
    [...inputTitle].forEach( (c) => {
      title.push(new HangmanLetter(c));
    });
    return title;
  }
}

class HangmanLetter {
  
  character: string;
  display: boolean;

  constructor(inputCharacter: string){
    this.character = inputCharacter;
    this.display = (inputCharacter == ' ' || inputCharacter == '\n') ? true : false;
  }
  
  checkCharacter(inputCharacter: string): boolean {
    if(this.character.toUpperCase() == inputCharacter.toUpperCase()) {
      return (this.display = true);
    }
    return false;
  }
}