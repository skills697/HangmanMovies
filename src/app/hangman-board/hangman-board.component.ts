import { Component, inject } from '@angular/core';
import { HangmanControllerService } from '../hangman-controller.service';

@Component({
  selector: 'app-hangman-board',
  template: `
  <div id="hangman-display">
      <div *ngFor="let letter of this.hs.title()" [ngClass]="{'hangman-disp-space': letter.character == ' ', 'hangman-disp-letter': letter.character != ' '}">
          {{ (letter.display) ? letter.character : '_' }}
      </div>
  </div>
  `,
  styles: [`
    #hangman-display {
        padding: 12px;
        text-align:center;
    }

    .hangman-disp-space {
        min-height: 18px;
        min-width: 8px;
        margin: 3px;
        padding: 3px 4px;
        float: left;
    }

    .hangman-disp-letter {
        background-color: #fff;
        border: 1px solid #000;
        min-height: 18px;
        min-width: 8px;
        margin: 3px;
        padding: 3px 5px;
        float: left;
        box-shadow: #2a2a2a 2px 2px;
     }
  `]
})
export class HangmanBoardComponent {
  
  textSplit: string[] = [];

  hs = inject(HangmanControllerService);
  
  constructor() {}
}

