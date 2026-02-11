import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MOVIES } from '../../data/movies.data';
import { CommonModule, DatePipe } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-movie-list',
  imports: [MatCardModule,MatButtonModule,DatePipe,CommonModule,RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
movies: Movie[] = [];
  dates: Date[] = [];

  // store selected date per movie
  // selectedDate: { [key: number]: Date | undefined } = {};
selectedMovieId: number | null = null;
selectedDate: Date | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.movies = MOVIES;
    this.generateNext5Days();
  }
ngAfterViewInit():void{
  const options={
    strings:['TicketEase'],
    typeSpeed:100,
    backSpeed:150,
    backDelay:200,
    loop:true,
    showCursor:true,
    cursorChar:'|'
  };
  new Typed('#typed-text',options)
}
  // ONLY today + next 5 days (no past dates)
  generateNext5Days(): void {
    const today = new Date();
    for (let i = 0; i <= 5; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.dates.push(date);
    }
  }

 selectDate(movieId: number, date: Date): void {
  this.selectedMovieId = movieId;
  this.selectedDate = date;
}


  bookNow(movie: Movie): void {
      if (this.selectedMovieId !== movie.id || !this.selectedDate) return;
 console.log('Book clicked', movie.id, this.selectedDate);
    this.router.navigate(['/show-times', movie.id], {
      queryParams: {
        date: this.selectedDate.toISOString()
      }
    });
  }
 
}
