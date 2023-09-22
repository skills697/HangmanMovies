import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-key-button',
  templateUrl: './key-button.component.html',
  styleUrls: ['./key-button.component.scss']
})
export class KeyButtonComponent {

  @Input() keyVal: string | undefined;
  @Input() stopped = false;
  @Output() keySelect = new EventEmitter<string>();
  pressed = false;
  
  onClick(){
    if(!this.pressed && !this.stopped){
      this.pressed = true;
      this.keySelect.emit("" + this.keyVal);
    }
  }
}
