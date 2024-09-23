import { TestBed } from '@angular/core/testing';

import { Shared1Service } from './shared1.service';

describe('Shared1Service', () => {
  let service: Shared1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shared1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
