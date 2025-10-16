import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor(private cookieService: CookieService) {
    const savedName = this.cookieService.get('username');
    if (savedName) {
      this.usernameSubject.next(savedName);
    }
  }

  setUsername(name: string) {
    this.cookieService.set('username', name, 7); // store for 7 days
    this.usernameSubject.next(name);
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }
}
