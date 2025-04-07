import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http=inject(HttpClient);

  private apiUrl='http://localhost:8080/api/auth';

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,credentials,{responseType: 'text'});
  }

  register(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,user,{responseType: 'text'});
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('token');
  }
  
}
