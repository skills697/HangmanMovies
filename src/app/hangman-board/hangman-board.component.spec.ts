import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanBoardComponent } from './hangman-board.component';

describe('HangmanBoardComponent', () => {
  let component: HangmanBoardComponent;
  let fixture: ComponentFixture<HangmanBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HangmanBoardComponent]
    });
    fixture = TestBed.createComponent(HangmanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
