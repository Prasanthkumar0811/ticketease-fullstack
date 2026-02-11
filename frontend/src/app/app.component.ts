import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from "./pages/movie-list/movie-list.component";
import { HeaderComponent } from "./resubale/header/header.component";
import { FooterComponent } from "./resubale/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ticketbooking';
}
