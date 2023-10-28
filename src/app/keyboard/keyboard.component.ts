import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Key, KeyPress } from '../keys';
import { HangmanControllerService } from '../hangman-controller.service';

@Component({
  selector: 'app-keyboard',
  styleUrls: ['./keyboard.component.scss'],
  template:`
  <div class="keyboard-cont">
      <div *ngFor="let key of hs.keys()" class="keyboard-btn-cont">
          <button (click)="selectKey(key.id)" [disabled]="key.pressed || hs.ended()" class="keyboard-btn">{{ key.id }}</button>
      </div>
  </div>
  `
})


export class KeyboardComponent {
  
  hs = inject(HangmanControllerService);

  constructor() { }
  
  selectKey(keyId: string){
    this.hs.keyPress$.next({id: keyId});
  }
}
