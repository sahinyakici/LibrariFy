import { Component, OnInit } from '@angular/core';
import { Genre } from '../../models/entityModels/genre';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
})
export class GenreComponent implements OnInit {
  message: string = '';
  success: boolean = false;
  dataLoaded: boolean = false;
  genres: Genre[] = [];

  constructor(private genreService: GenreService) {}
  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenres().subscribe((response) => {
      this.genres = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }
}
