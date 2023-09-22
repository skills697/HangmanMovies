import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanPersonComponent } from './hangman-person.component';

describe('HangmanPersonComponent', () => {
  let component: HangmanPersonComponent;
  let fixture: ComponentFixture<HangmanPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HangmanPersonComponent]
    });
    fixture = TestBed.createComponent(HangmanPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
