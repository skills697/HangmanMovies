import { Component, Input, Output, EventEmitter} from '@angular/core';
import { KeyMappingService } from '../key-mapping.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  
  @Output() doGuess = new EventEmitter<string>();
  @Input() stopped = false;
  keys = this.keyMappingService.getRemaining();

  constructor(
    private keyMappingService: KeyMappingService
  ) { }
  
  selectKey(keyEvent: string){
    this.doGuess.emit(keyEvent);
  }
}
