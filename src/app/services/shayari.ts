import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Shayari {
  id?: number;
  category: string;
  content: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class shayariService {
  private apiUrl = 'http://localhost:5200/api/shay';
    
  private shayariSubject = new BehaviorSubject<Shayari[]>([]);
  shayaris$ = this.shayariSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadShayaris();
  }

  loadShayaris() {
    this.http.get<Shayari[]>(`${this.apiUrl}`)
      .subscribe(shayaris => this.shayariSubject.next(shayaris));
  }

  addShayari(shayari: Shayari): Observable<any> {
    // Ensure updatedBy is not null
    if (!shayari.updatedBy) {
      shayari.updatedBy = shayari.createdBy || 'Anonymous';
    }

    return this.http.post(`${this.apiUrl}/add`, shayari)
      .pipe(
        tap(() => this.loadShayaris()) // Refresh list after adding
      );
  }

  getLastShayari(): Observable<Shayari> {
    return this.http.get<Shayari>(`${this.apiUrl}/last`);
  }
}
