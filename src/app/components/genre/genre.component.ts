import { Genre } from './../../models/entityModels/genre';
import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
})
export class GenreComponent implements OnInit {
  message: string = '';
  success: boolean = false;
  allBookCount: number = 0;
  dataLoaded: boolean = false;
  genres: Genre[] = [];
  currentGenre: Genre;

  constructor(private genreService: GenreService) {}
  ngOnInit(): void {
    this.setAllGenreClass();
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenres().subscribe((response) => {
      response.data.forEach((element) => {
        if (element.bookCount != undefined) {
          this.allBookCount += element.bookCount;
        }
        this.genres.push(element);
      });
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  setCurrentGenre(genre: Genre) {
    this.currentGenre = genre;
  }

  getCurrentGenreClass(genre: Genre) {
    if (this.currentGenre == genre) {
      return 'list-group-item d-flex justify-content-between align-items-center active';
    } else {
      return 'list-group-item d-flex justify-content-between align-items-center';
    }
  }

  getAllGenreClass() {
    if (this.currentGenre.genreId == undefined) {
      return 'list-group-item d-flex justify-content-between align-items-center active';
    } else {
      return 'list-group-item d-flex justify-content-between align-items-center';
    }
  }

  setAllGenreClass() {
    const newGenre: Genre = {
      genreId: undefined,
      genreName: undefined,
      bookCount: undefined,
    };
    this.currentGenre = newGenre;
  }
}
