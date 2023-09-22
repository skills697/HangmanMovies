import { Component, OnInit } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { KeyMappingService } from '../key-mapping.service';
import { HangmanPersonComponent } from '../hangman-person/hangman-person.component';
import { HangmanControllerService, InitGameEvent } from '../hangman-controller.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, InitGameEvent {

  person = new HangmanPersonComponent();
  guessesRemaining = 0;
  displaying = "";
  notice = "";
  stopped = false;
  win = false;
  
  constructor(
    private keyMapService: KeyMappingService,
    private hangmanController: HangmanControllerService
  ){ }
  
  ngOnInit(): void {
    this.hangmanController.newGame(this);
  }

  resetGame(){
    this.hangmanController.newGame(this);
  }
  
  handleGuess(inputLetter: string): boolean {
    const res = this.hangmanController.guessLetter(inputLetter);
    this.guessesRemaining = this.hangmanController.getGuessesRemaining();
    this.displaying = this.hangmanController.getDisplaying();
    this.win = this.hangmanController.getWin();
    if(this.guessesRemaining <= 0 || this.win) {
      this.stopped = true;
      this.notice = (this.win) ? "You have won!" : "No remaining tries: \"" + this.hangmanController.getTitle() + "\"";
    }
    else
    {
      this.notice = "Remaining: " + this.guessesRemaining;
    }
    return false;
  }

  onGameInit(): void {
    this.guessesRemaining = this.hangmanController.getGuessesRemaining();
    this.displaying = this.hangmanController.getDisplaying();
    this.stopped = false;
    this.win = false;
    this.notice = "Remaining: " + this.guessesRemaining;
  }
}
