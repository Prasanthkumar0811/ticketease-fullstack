import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatCardModule,MatButtonModule,CommonModule,RouterModule,MatProgressSpinnerModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  isLoading:boolean=false;
  constructor(private router:Router){}

  goHome(){
    this.isLoading=true;
    setTimeout(()=>{
         this.router.navigate(['/movies'])
    },1500)
    
  }
}
