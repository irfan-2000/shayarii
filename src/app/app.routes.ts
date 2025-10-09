import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AddShayari } from './components/add-shayari/add-shayari';
import { ListShayari } from './components/list-shayari/list-shayari';
import { ShayariBoard } from './components/shayari-board/shayari-board';



export const routes: Routes = [
  { path: 'add', component: AddShayari },
  { path: 'list', component: ListShayari },
  { path: '', component: ShayariBoard },

  { path: '**', redirectTo: '' }
];
