import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class KeyMappingService {
  keysPressed: string[] = [];
  keysRemaining: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  constructor() { }
  
  clearPressed() {
    this.keysPressed = [];
    this.keysRemaining = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return this.keysPressed;
  }
  
  pressKey(key: string) {
    let keyIndex = this.keysRemaining.indexOf(key);
    if(keyIndex >= 0){
      this.keysPressed.push(this.keysRemaining.splice(keyIndex, 1)[0]);
    }
    return (keyIndex >= 0) ? true : false;
  }
  
  getPressed() {
    return this.keysPressed;
  }
  
  getRemaining() {
   return this.keysRemaining;
  }
}
