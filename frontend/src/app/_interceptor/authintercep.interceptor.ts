import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';

export const authintercepInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=inject(AuthService)
  const token=auth.getToken()

  const authreq=token ? req.clone({setHeaders:{
    Authorization:`Bearer ${token}`
  }}):req
  return next(authreq);
};
