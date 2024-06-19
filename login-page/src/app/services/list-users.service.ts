import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../types/user-response.type'; // Certifique-se de importar o tipo User correto

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  private apiUrl: string = 'http://localhost:8080/auth'; // Atualize com o URL da sua API

  constructor(private httpClient: HttpClient) { }

  // Método para listar todos os usuários
  listUsers(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(`${this.apiUrl}/list-users`);
  }
}
