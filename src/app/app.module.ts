import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { HangmanComponent } from './hangman/hangman.component';
import { KeyButtonComponent } from './key-button/key-button.component';
import { HangmanPersonComponent } from './hangman-person/hangman-person.component';
import { HangmanBoardComponent } from './hangman-board/hangman-board.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    HangmanComponent,
    KeyButtonComponent,
    HangmanPersonComponent,
    HangmanBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
