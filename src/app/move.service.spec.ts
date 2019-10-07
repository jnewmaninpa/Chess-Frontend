import { TestBed } from '@angular/core/testing';

import { MoveService } from '../services/move.service';

describe('MoveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveService = TestBed.get(MoveService);
    expect(service).toBeTruthy();
  });
});
