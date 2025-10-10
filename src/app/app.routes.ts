import { Routes } from '@angular/router';

import { AddShayari } from './components/add-shayari/add-shayari';

import { ShayariBoard } from './components/shayari-board/shayari-board';



export const routes: Routes = [
  { path: 'add', component: AddShayari },
 
  { path: '', component: ShayariBoard },

  { path: '**', redirectTo: '' }
];
