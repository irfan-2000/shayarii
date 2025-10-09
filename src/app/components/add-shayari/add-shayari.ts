import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shayari, shayariService } from '../../services/shayari';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-shayari',
  templateUrl: './add-shayari.html',
  styleUrls: ['./add-shayari.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddShayari {
  selectedCategory: string = '';
  content: string = '';
  showSuccess: boolean = false;

  constructor(private shayariService: shayariService, private router: Router) {}

  addShayari() {
    if (!this.selectedCategory || !this.content.trim()) {
      alert('Please select a category and enter content.');
      return;
    }

    const newShayari: Shayari = {
      category: this.selectedCategory,
      content: this.content.trim()
    };

    this.shayariService.addShayari(newShayari);

    // Show success popup
    this.showSuccess = true;

    // Clear inputs
    this.selectedCategory = '';
    this.content = '';

    // Hide popup after 1.5 seconds and navigate to list
    setTimeout(() => {
      this.showSuccess = false;
      this.router.navigate(['/list']); // Navigate to Shayari List page
    }, 1500);
  }
}
