import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HangmanControllerService {
  
  private title: HangmanLetter[] | undefined;
  private guessesRemaining = 6;

  constructor(
    private http: HttpClient
  ) { }
  
  newGame(gameInitHandler: InitGameEvent) {
    const fetchTitle = this.http.get("/api/movie-title", { responseType: 'text' });
    fetchTitle.subscribe( resp => {
      console.log("RESPONSE:");
      console.log(resp);
      this.setTitle(resp);
      gameInitHandler.onGameInit();
    });
  }
  
  setTitle(inputTitle: string){
    this.title = [];
    [...inputTitle].forEach( (c) => {
      this.title?.push(new HangmanLetter(c));
    });
  }
  
  guessLetter(guess: string): boolean{
    let res = false;
    this.title?.forEach((c) => {
      if(c.checkCharacter(guess)){
        res = true;
      }
    })
    if(!res) {
      this.guessesRemaining--;
    }
    return res;
  }
  
  getGuessesRemaining(){
    return this.guessesRemaining;
  }
  
  getDisplaying() {
    let res = '';
    this.title?.forEach((c) => {
      res += c.getDisplay();
    })
    return res;
  }
  
  getTitle() {
    let res = '';
    this.title?.forEach((c) => {
      res += c.getCharacter();
    })
    return res;
  }
  
  getWin() {
    let res = true;
    this.title?.forEach((c) => {
      if(!c.getGuessed()) { res = false; }
    })
    return res;
  }
}

export interface InitGameEvent {
  onGameInit(): void;
}

class HangmanLetter {
  
  private character: string;
  private display: boolean;

  constructor(inputCharacter: string){
    this.character = inputCharacter;
    this.display = (inputCharacter == ' ' || inputCharacter == '\n') ? true : false;
  }
  
  checkCharacter(inputCharacter: string){
    if(this.character.toUpperCase() == inputCharacter.toUpperCase()) {
      return (this.display = true);
    }
    return false;
  }
  
  getCharacter(){ return this.character; }
  getDisplay(){ return (this.display) ? this.character : '_'; }
  getGuessed(){ return this.display; }
}
