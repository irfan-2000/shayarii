import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Sidebar } from "./components/sidebar/sidebar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ required if you're using `imports` array
  imports: [RouterOutlet, Navbar, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ must be plural, not `styleUrl`
})
export class App {
  protected readonly title = signal('shayarii');

  // ✅ If you want to use CookieService here, inject it via constructor
  constructor(private cookieService: CookieService) {}
}
