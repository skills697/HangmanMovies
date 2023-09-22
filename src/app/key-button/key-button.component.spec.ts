import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyButtonComponent } from './key-button.component';

describe('KeyButtonComponent', () => {
  let component: KeyButtonComponent;
  let fixture: ComponentFixture<KeyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyButtonComponent]
    });
    fixture = TestBed.createComponent(KeyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
