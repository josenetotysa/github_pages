import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PortabilidadeResponse } from '../../types/portabilidade-response.type';

@Injectable({
  providedIn: 'root'
})
export class ListPortabilidadeService {

  private apiUrl: string = 'http://10.21.255.127:8080/login_auth_api/portabilidade';
  private portabilidadeUpdatedSubject = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  // Método para listar as portabilidades (já existe no seu código)
  listPortabilidade(): Observable<PortabilidadeResponse[]> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<PortabilidadeResponse[]>(`${this.apiUrl}/list`, { headers: headers });
  }

  // Método para obter a contagem de números inválidos
  getInvalidVirtualNumbersCount(): Observable<number> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Fazendo a requisição GET para obter a contagem de números inválidos
    return this.httpClient.get<number>(`${this.apiUrl}/countInvalidVirtualNumbers`, { headers: headers });
  }

  // Método para obter os números inválidos
  getInvalidVirtualNumbers(): Observable<string[]> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<string[]>(`${this.apiUrl}/invalidVirtualNumbers`, { headers: headers });
  }

  getPortabilidadeUpdatedObservable(): Observable<void> {
    return this.portabilidadeUpdatedSubject.asObservable();
  }

  notifyPortabilidadeUpdated(): void {
    this.portabilidadeUpdatedSubject.next();
  }
}