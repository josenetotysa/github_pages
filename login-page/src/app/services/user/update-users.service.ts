import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserResponse } from '../../types/user-response.type';

@Injectable({
  providedIn: 'root'
})
export class UpdateUsersService {

  private apiUrl: string = 'http://localhost:8080/user';

  constructor(private httpClient: HttpClient) { }

  updateUsers(name: string, email: string, login: string, password: string): Observable<UserResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<UserResponse[]>(`${this.apiUrl}/update`,  { name, email, login, password } , { headers: headers })
  }
}
