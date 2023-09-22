import { TestBed } from '@angular/core/testing';

import { KeyMappingService } from './key-mapping.service';

describe('KeyMappingService', () => {
  let service: KeyMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
