import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authintercepInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=inject(AuthService)
  const router=inject(Router)
  const token=auth.getToken()

  const authreq=token ? req.clone({setHeaders:{
    Authorization:`Bearer ${token}`
  }}):req
  return next(authreq).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status == 401){
          auth.logout()
          router.navigate(['/login'],{
            queryParams: {redirectURL:router.url}
          })
      }
      return throwError(()=>error)
    })
  );
};
