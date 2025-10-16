import { Component, OnInit } from '@angular/core';
import { Shayari, shayariService } from '../../services/shayari';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shayari-board',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shayari-board.html',
  styleUrls: ['./shayari-board.css']
})
export class ShayariBoard implements OnInit {
  usernameInput: string = '';
  shayaris: Shayari[] = [];
  groupedShayaris: { [category: string]: Shayari[] } = {};
  categories: string[] = ['All', 'Love Shayari', 'Motivational Shayari', 'Funny Shayari', 'Sad Shayari'];
  selectedCategory = 'All';

  showAddPopup = false;
  addForm: FormGroup;

  username: string | null = null;
  showNamePrompt = false;

  constructor(
    private shayService: shayariService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      category: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.username = this.cookieService.get('username');
    if (!this.username) {
      this.showNamePrompt = true;
    }

    this.shayService.shayaris$.subscribe(data => {
      this.shayaris = data;
      this.groupShayaris();
    });
  }

  setUsername(nameInput: string) {
    if (nameInput && nameInput.trim()) {
      this.username = nameInput.trim();
      this.cookieService.set('username', this.username);
      this.showNamePrompt = false;
    } else {
      alert('Please enter a valid name!');
    }
  }

  groupShayaris() {
    this.groupedShayaris = {};
    const filtered = this.selectedCategory === 'All'
      ? this.shayaris
      : this.shayaris.filter(s => s.category === this.selectedCategory);

    filtered.forEach(s => {
      if (!this.groupedShayaris[s.category]) {
        this.groupedShayaris[s.category] = [];
      }
      this.groupedShayaris[s.category].push(s);
    });
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    this.groupShayaris();
  }

  toggleAddPopup() {
    this.showAddPopup = !this.showAddPopup;
  }

  addShayari() {
    if (!this.username) {
      alert('Username not set!');
      return;
    }

    if (this.addForm.valid) {
      const newShayari: Shayari = {
        category: this.addForm.value.category,
        content: this.addForm.value.content,
        createdBy: this.username,
        updatedBy: this.username,
      };

      // Subscribe here to handle errors
      this.shayService.addShayari(newShayari).subscribe({
        next: () => {
          this.addForm.reset();
          this.showAddPopup = false;
          alert('Shayari added successfully!');
        },
        error: (err) => {
          console.error('Error adding shayari:', err);
          alert('Failed to add shayari. Check console for details.');
        }
      });

    } else {
      alert('Please fill all fields!');
    }
  }
}
