import { TestBed } from '@angular/core/testing';

import { GlobalVarServiceService } from './global-var-service.service';

describe('GlobalVarServiceService', () => {
  let service: GlobalVarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalVarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
