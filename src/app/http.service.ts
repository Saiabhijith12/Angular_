import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iuser } from './interfaces/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiurl = "https://localhost:7266";
  http = inject(HttpClient);

  constructor() { }

  getAllUsers() {
    return this.http.get<Iuser[]>(`${this.apiurl}/api/User`).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Error fetching users'));
      })
    );
  }

  createUser(user: Iuser) {
    return this.http.post(`${this.apiurl}/api/user`, user).pipe(
      catchError(error => {
        console.error('Error creating user:', error);
        return throwError(() => new Error('Error creating user'));
      })
    );
  }

  getUser(user_name: string) {
    return this.http.get<Iuser>(`${this.apiurl}/api/user/${user_name}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Error fetching user'));
      })
    );
  }

  updateUser(user_name: string, user: Iuser) {
    return this.http.put<Iuser>(`${this.apiurl}/api/user/${user_name}`, user).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Error updating user'));
      })
    );

  }
  DeleteUser(user_name: string) {
    return this.http.delete<Iuser>(`${this.apiurl}/api/user/${user_name}`).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Error updating user'));
      })
    );
    
  }
}
