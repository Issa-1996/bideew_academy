import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    // Check for existing user in localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // In a real app, this would be an HTTP call to your backend
    // This is a mock implementation
    if (email === 'test@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email,
        name: 'Test User',
        role: 'student',
        completedCourses: [],
        progress: {}
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  register(userData: Omit<User, 'id' | 'completedCourses' | 'progress'>): Observable<boolean> {
    // Mock implementation
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      completedCourses: [],
      progress: {}
    };
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.currentUserSubject.next(newUser);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // In a real app, this would be handled by your backend
  requestPasswordReset(email: string): Observable<boolean> {
    console.log(`Password reset requested for ${email}`);
    return of(true);
  }
}
