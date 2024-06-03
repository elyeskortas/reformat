import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service'; // Assurez-vous d'importer AuthService

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access the route', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(authGuard.canActivate()).toBeTrue();
  });

  it('should not allow the unauthenticated user to access the route', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    expect(authGuard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
