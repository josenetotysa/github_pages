import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserResponse } from '../../types/user-response.type';
import { ListUsersService } from './list-users.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteUsersService {

  private apiUrl: string = 'http://localhost:8080/user';

  constructor(
    private httpClient: HttpClient,
    private listUsersService: ListUsersService
  ) { }

  deleteUsers(username: string): Observable<any>{
    const token = sessionStorage.getItem('auth-token');

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.httpClient.delete(`${this.apiUrl}/delete`, login , { headers: headers })
  // }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Especificando o tipo de conteúdo como JSON
    });

    const options = {
      headers: headers,
      body: { username: username } // Enviando o login como parte do corpo da requisição
    };
    // this.listUsersService.notifyUsersUpdated()
    return this.httpClient.delete<any>(`${this.apiUrl}/delete`, options);
  }
}
