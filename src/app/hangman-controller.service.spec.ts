import { TestBed } from '@angular/core/testing';

import { HangmanControllerService } from './hangman-controller.service';

describe('HangmanControllerService', () => {
  let service: HangmanControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HangmanControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
