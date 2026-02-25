import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../_services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import lottie from 'lottie-web';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatCardModule,RouterModule,MatProgressSpinnerModule,MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm!:FormGroup;
backendError:string='';
isSubmitting:boolean=false;
// @ViewChild('lottieContainer')lottieContainer!: ElementRef;

constructor(
  private fb:FormBuilder,
  private authService:AuthService,
  private router:Router,
  private snackBar:MatSnackBar,
  private _activateRoute:ActivatedRoute
){}
ngOnInit(){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
}
//  ngAfterViewInit() {
//     lottie.loadAnimation({
//       container: this.lottieContainer.nativeElement,
//       renderer: 'svg',
//       loop: true,
//       autoplay: true,
//       path: 'animations/login-page.json'
//     });
//   }
login() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.backendError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {

        // ✅ store token
        localStorage.setItem('token', res.token);

        // ✅ store user name (optional)
        localStorage.setItem('fullname', res.user.name);
        const redirectURL=this._activateRoute.snapshot.paramMap.get('redirectURL')

        setTimeout(()=>{
          this.onSuccess('Login successful')
          if(redirectURL){
            this.router.navigateByUrl(redirectURL)
          }else{
            this.router.navigate(['/movies']);
          }
         
        },3000)        
      },
      error: (err) => {
        this.isSubmitting = false;
        this.backendError = err.error?.message || 'Login failed';
      }
    });
  }
  onSuccess(msg: string): void {
  this.snackBar.open(msg, 'OK', {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}
}
