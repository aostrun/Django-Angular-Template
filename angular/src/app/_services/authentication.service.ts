import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl, User } from '../_models';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(apiUrl+'/rest-auth/login/', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.key) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.key){
             // remove user from local storage to log user out
                return this.http.post<any>(apiUrl+'/rest-auth/logout/', { key : user.key})
                .pipe(map(a => {
                    localStorage.removeItem('currentUser');
                    
                }));
        }
       
        
    }
}