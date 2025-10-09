import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Shayari {
  id?: number;
  category: string;
  content: string;
  createdBy?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class shayariService {
  private apiUrl = 'http://localhost:5200/api/shay'; // Replace with your backend URL

  // For UI reactivity
  private shayariSubject = new BehaviorSubject<Shayari[]>([]);
  shayaris$ = this.shayariSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadShayaris();
  }

  // Load all shayaris from backend
  loadShayaris() {
    this.http.get<Shayari[]>(`${this.apiUrl}`)
      .subscribe(shayaris => this.shayariSubject.next(shayaris));
  }

  // Add new shayari to backend
  addShayari(shayari: Shayari) {
    return this.http.post(`${this.apiUrl}/add`, shayari)
      .pipe(
        tap(() => this.loadShayaris()) // Refresh the list after adding
      ).subscribe();
  }

  // Optionally get last added shayari
  getLastShayari(): Observable<Shayari> {
    return this.http.get<Shayari>(`${this.apiUrl}/last`);
  }
}
