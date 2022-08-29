import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCredentials } from '../models/user.model';
import { url } from '../models/url.model';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public apiUrl: string;
    constructor(private http: HttpClient) {
        this.apiUrl = url;
    }
    login(cred: UserCredentials): Observable<string> {
        return this.http.post<any>(`${this.apiUrl}/api/GetToken`, { userName: cred.userName, password: cred.password });
    }
    Signup(user: User): Observable<string> {
        return this.http.post<any>(`${this.apiUrl}/author/signup`, { userId: 0, userName: user.UserName, emailId: user.Email, password: user.Password, userType: "author" },
            {
                headers: new HttpHeaders(
                    {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    })
            });
    }
    logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('Name');

    }
}



