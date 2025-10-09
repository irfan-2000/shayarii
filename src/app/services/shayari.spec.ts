import { TestBed } from '@angular/core/testing';

import { Shayari } from './shayari';

describe('Shayari', () => {
  let service: Shayari;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shayari);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
