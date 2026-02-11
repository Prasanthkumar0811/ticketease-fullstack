import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MOVIES } from '../../data/movies.data';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Theatre } from '../../models/theatre.model';
import { THEATRES } from '../../data/show-time.data';

@Component({
  selector: 'app-show-time',
  imports: [MatCardModule,DatePipe,CommonModule,MatButtonModule],
  templateUrl: './show-time.component.html',
  styleUrl: './show-time.component.css'
})
export class ShowTimeComponent {
movie!: Movie;
  selectedDate!: Date;

  selectedTheatre!: Theatre;
  selectedTime: string | null = null;

theatres:Theatre[]=THEATRES;
  // hardcoded show times
  // timeSlots: string[] = [
  //   '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
  //   '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '06:30 PM',
  //   '07:00 PM', '08:00 PM'
  // ];

  // static cinema info (for UI richness)
  // cinemaName = 'PVR Cinemas';
  // location = 'Chennai';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1️⃣ get movie id from URL
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
    if (!movieId || !params['date']) {
      this.router.navigate(['/movies']);
      return;
    }

    this.selectedDate = new Date(params['date']);
    this.movie = MOVIES.find(m => m.id === movieId)!;
  });
  }

  selectTime(theatre:Theatre,time: string): void {
    this.selectedTheatre=theatre
    this.selectedTime = time;
  }

  continue(): void {
    if (!this.selectedTime) return;

     this.router.navigate(
    ['/seat-selection', this.movie.id],
    {
      queryParams: {
        date: this.selectedDate.toISOString(),
        time: this.selectedTime,
        theatre: this.selectedTheatre.name
      }
    }
  );
  }
  goBack(){
    this.router.navigate(['/movies'])
  }

}
