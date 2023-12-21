import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookAddComponent } from './components/book-add/book-add.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookComponent },
  { path: 'books', component: BookComponent },
  { path: 'books/:bookId', component: BookComponent },
  { path: 'genres/:genreId', component: BookComponent },
  { path: 'book/add', component: BookAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
