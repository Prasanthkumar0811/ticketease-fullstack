import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  private apiurl='http://localhost:3000/api/authverify'

  register(data:any):Observable<any>{
    return this.http.post(`${this.apiurl}/register`,data)
  }
  login(data:any):Observable<any>{
    return this.http.post(`${this.apiurl}/login`,data)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getuserName(){
    return localStorage.getItem('fullname')
  }
  isLoggedIn():boolean{
    return !!this.getToken()
  }
  logout(){
    localStorage.clear()
  }
}
