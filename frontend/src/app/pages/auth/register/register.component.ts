import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../_services/auth.service';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import lottie from 'lottie-web';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatCardModule
    ,MatButtonModule,MatIconModule,MatSnackBarModule,MatInputModule,RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!:FormGroup;
  isSubmitting:boolean=false
  backendError: string = '';

  constructor(private fb:FormBuilder,
   private authService:AuthService,
   private router:Router,
   private snackBar:MatSnackBar
  ){}
 @ViewChild('lottieContainer')lottieContainer!: ElementRef;
  ngOnInit():void{
    this.registerForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]]
    },{
      validators:this.passwordMatchValidator
    })
  }
   ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'animations/form-registration.json'
    });
  }
   passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
  submit(){
    if(this.registerForm.invalid){
      return
    }
    this.backendError=''
    this.isSubmitting=true
    // const { name, email, phone, password } = this.registerForm.value;
    // const payload = { name, email, phone, password };
    this.authService.register(this.registerForm.value).subscribe({
      next:(res)=>{
        this.onSuccess('Registration Successful');
        setTimeout(()=>{
this.router.navigate(['/login'])
        },3000)
        
      },error:(err)=>{
        this.isSubmitting=false;
        this.backendError= err.error?.message || 'Registration failed';
      // this.onError(err.error?.message || 'Registration failed');
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
onError(msg: string): void {
  this.snackBar.open(msg, 'Close', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}

}
