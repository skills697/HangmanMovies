import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-board',
  templateUrl: './hangman-board.component.html',
  styleUrls: ['./hangman-board.component.scss']
})
export class HangmanBoardComponent implements OnChanges {
  
  @Input() displayText = "";
  textSplit: string[] = [];
  
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.textSplit = [];
    [...this.displayText].forEach((c) => {
      this.textSplit.push( (c == ' ') ? ' ' : c );
    });
  }
}

