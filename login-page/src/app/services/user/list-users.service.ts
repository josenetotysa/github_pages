import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserResponse } from '../../types/user-response.type';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  private apiUrl: string = 'http://localhost:8080/user';
  private usersUpdatedSubject = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  listUsers(): Observable<UserResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<UserResponse[]>(`${this.apiUrl}/list`, { headers: headers });
  }

  getUsersUpdatedObservable(): Observable<void> {
    return this.usersUpdatedSubject.asObservable();
  }
  
  notifyUsersUpdated(): void {
    this.usersUpdatedSubject.next();
  }
}
