import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, inject } from '@angular/core';
import { HangmanControllerService } from '../hangman-controller.service';

@Component({
  selector: 'app-hangman-person',
  templateUrl: './hangman-person.component.html',
  styles: [`
    #hangman-person {
        display: flex;
        justify-content: center;
    }
  `]
})
export class HangmanPersonComponent implements OnChanges, AfterViewInit {
  
  private head: HTMLElement | undefined;
  private body: HTMLElement | undefined;
  private rightArm: HTMLElement | undefined;
  private leftArm: HTMLElement | undefined;
  private rightLeg: HTMLElement | undefined;
  private leftLeg: HTMLElement | undefined;
  private failTries = [false, false, false, false, false, false];
  @Input() guessesRemaining: number | undefined;

  hs = inject(HangmanControllerService);
  

  constructor(
  ){ }
  
  ngOnChanges(changes: SimpleChanges){
    let change = changes['guessesRemaining'];
    //console.log('Changes Property: on - ' + change.previousValue + ', curr - ' + change.currentValue + ' | ' + this.guessesRemaining);
    if(change.previousValue != undefined) {
      if(change.previousValue < change.currentValue)
      {
        this.resetTries();
      }
      else 
      {
        this.failTry();
      }
    }
  }
  
  failTry(): boolean{
    const myParts = [this.head, this.body, this.rightArm, this.leftArm, this.rightLeg, this.leftLeg];
    for(let t=0; t < this.failTries.length; t++){
      if(!this.failTries[t]){
        const part = myParts[t];
        if(part != undefined){
          const ch = Array.from(part.children) as HTMLElement[];
          for( const childElement of ch ){
            childElement.style.display = 'block';
          }
        }
        return (this.failTries[t] = true);
      }
    }
    return false;
  }
  
  resetTries() {
    this.failTries = [false, false, false, false, false, false];
    const myParts = [this.head, this.body, this.rightArm, this.leftArm, this.rightLeg, this.leftLeg];
    for(const part of myParts){
      if(part != undefined){
        const ch = Array.from(part.children) as HTMLElement[];
        for( const childElement of ch ){
          childElement.style.display = 'none';
        }
      } 
    }
  }

  ngAfterViewInit(): void {
    this.head = document.getElementById("hangman-svg-head") || undefined;
    if(this.head != undefined){
      const ch = Array.from(this.head.children) as HTMLElement[];
      for( const childElement of ch ){
        childElement.style.display = 'none';
      }
    }
    this.body = document.getElementById("hangman-svg-body") || undefined;
    if(this.body != undefined){
      const ch = Array.from(this.body.children) as HTMLElement[];
      for( const childElement of ch ){
        childElement.style.display = 'none';
      }
    }
    this.rightArm = document.getElementById("hangman-svg-rightarm") || undefined;
    if(this.rightArm != undefined){
      const ch = Array.from(this.rightArm.children) as HTMLElement[];
      for( const childElement of ch ){
        childElement.style.display = 'none';
      }
    }
    this.leftArm = document.getElementById("hangman-svg-leftarm") || undefined;
    if(this.leftArm != undefined){
      const ch = Array.from(this.leftArm.children) as HTMLElement[];
      for( const childElement of ch ){
        childElement.style.display = 'none';
      }
    }
    this.rightLeg = document.getElementById("hangman-svg-rightleg") || undefined;
    if(this.rightLeg != undefined){
      const ch = Array.from(this.rightLeg.children) as HTMLElement[];
      for( const childElement of ch ){
        childElement.style.display = 'none';
      }
    }
    this.leftLeg = document.getElementById("hangman-svg-leftleg") || undefined;
    if(this.leftLeg != undefined){
      const ch = Array.from(this.leftLeg.children) as HTMLElement[];
      for( const childElement of ch ){
        childElement.style.display = 'none';
      }
    }
  }
}
