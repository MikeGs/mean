import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  helper = new JwtHelperService();

  constructor(private _http: HttpClient){}

  registerUser(user) {
    return this._http.post('users/register', user);
  }

  authenticateUser(user) {
    return this._http.post('users/authenticate', user);
  }

  getProfile() {
    this.loadToken();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this._http.get('users/profile', httpOptions);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user) );
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    if(!this.authToken){
      this.loadToken();
    }

    return !this.helper.isTokenExpired(this.authToken); 
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
