import { TestBed } from '@angular/core/testing';

import { LoadingscreanInterceptor } from './loadingscrean.interceptor';

describe('LoadingscreanInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingscreanInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingscreanInterceptor = TestBed.inject(LoadingscreanInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
