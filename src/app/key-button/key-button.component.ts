import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-key-button',
  templateUrl: './key-button.component.html',
  styleUrls: ['./key-button.component.scss']
})
export class KeyButtonComponent implements OnChanges {

  @Input() keyVal: string | undefined;
  @Input() stopped = false;
  @Input() gameCounter = 0;
  @Output() keySelect = new EventEmitter<string>();
  pressed = false;
  
  onClick(){
    if(!this.pressed && !this.stopped){
      this.pressed = true;
      this.keySelect.emit("" + this.keyVal);
    }
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log("OnChanges Firing");
    let stchange = changes['stopped'];
    console.log("stchange=" + stchange);
    if(stchange && stchange.previousValue != undefined){
      if(stchange.previousValue && stchange.currentValue == false){
        console.log("Enabling Button for Stopped");
        this.pressed = false;
      }
    }
    let gc = changes['gameCounter'];
    console.log("gc=" + gc);
    if(gc && gc.previousValue != undefined){
      console.log("Enabling Button for GC");
      this.pressed = false;
    }
  }
}
