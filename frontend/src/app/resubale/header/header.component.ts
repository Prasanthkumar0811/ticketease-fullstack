import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-header',
  imports: [MatIconModule,MatButtonModule,MatMenuModule,MatDividerModule,
    MatSnackBarModule,MatProgressSpinnerModule,CommonModule,MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
username:string=''
isLoggingout:boolean=false;
constructor(
  private router:Router,
  private snackBar:MatSnackBar,
  private authService:AuthService,
  private dialog:MatDialog
){}

ngOnInit(){
  this.username=this.authService.getuserName() || 'user';
}

  logout(){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      width:'250px',
      data:{
        title:'Confirm Logout',
        message:'Are you Sure you want to logout'
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.isLoggingout = true;

      setTimeout(() => {
        this.authService.logout();
        this.isLoggingout = false;
        this.router.navigate(['/login']);
        this.onSuccess('Logged out successfully');
      }, 1500);
      }
    })
  }
  
onSuccess(msg: string): void {
  this.snackBar.open(msg, 'OK', {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}
}
