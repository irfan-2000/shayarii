import { Component, OnInit } from '@angular/core';
import { Shayari, shayariService } from '../../services/shayari';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-shayari',
  templateUrl: './list-shayari.html',
  styleUrls: ['./list-shayari.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListShayari implements OnInit {
  shayaris$: Observable<Shayari[]>;
  filteredShayaris$: Observable<Shayari[]>;
  selectedCategory: string = 'All';

  showNamePopup: boolean = false;
  enteredName: string = '';

  constructor(private shayariService: shayariService, private cookieService: CookieService) {
    this.shayaris$ = this.shayariService.shayaris$;
    this.filteredShayaris$ = this.shayaris$;
  }

  ngOnInit() {
    const storedName = this.cookieService.get('username');
    if (!storedName) {
      this.showNamePopup = true; // Show name popup
    }
  }

  submitName() {
    if (!this.enteredName.trim()) {
      alert('Please enter a valid name!');
      return;
    }

    // Save the name in cookie for 1 day
    this.cookieService.set('username', this.enteredName.trim(), 1);
    this.showNamePopup = false;
  }

  toggleDropdown() {
    // Dropdown code if needed
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredShayaris$ = this.shayaris$;
    } else {
      this.filteredShayaris$ = this.shayaris$.pipe(
        map(shayaris => shayaris.filter(s => s.category === category))
      );
    }
  }
}
