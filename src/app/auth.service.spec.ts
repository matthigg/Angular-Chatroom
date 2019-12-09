// Testing
import { TestBed } from '@angular/core/testing';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
