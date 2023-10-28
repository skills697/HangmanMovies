import { Component, OnInit, inject } from '@angular/core';
import { HangmanControllerService} from '../hangman-controller.service';

@Component({
  selector: 'app-hangman',
  styleUrls: ['./hangman.component.scss'],
  template: `
  <h2>Hangman Game</h2>
  <div class="hangman-gr">
      <div [ngClass]="{'hangman-n-win': this.hs.victory(), 'hangman-n-lose': !this.hs.victory() && this.hs.ended() , 'hangman-n': !this.hs.ended()}">
          <span>{{displayNotice()}}</span>
          <button id="hangman-newgame" (click)="resetGame()">New Game</button>
      </div>
      <div class="hangman-tl"><app-hangman-person [guessesRemaining]="this.hs.guessesRemaining()"></app-hangman-person></div>
      <div class="hangman-tr"><app-hangman-board></app-hangman-board></div>
      <div class="hangman-b"><app-keyboard></app-keyboard></div>
  </div>
  `
})
export class HangmanComponent implements OnInit {

  hs = inject(HangmanControllerService);
  
  constructor(){ }
  
  ngOnInit(): void {
    this.hs.newGame$.next(0);
  }

  resetGame(){
    this.hs.newGame$.next(0);
  }
  
  displayNotice(){
    var res = "Tries Remaining: " + this.hs.guessesRemaining();
    if(this.hs.victory()) {
      res = "You have won!"
    } else if (this.hs.ended()){
      res = "No Remaining Tries"
    }
    return res;
  }
}
