import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperadoraResponse } from '../types/operadora-response.type';

@Injectable({
  providedIn: 'root'
})
export class ListOperadorasService {

  private apiUrl: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  listOperadoras(): Observable<OperadoraResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<OperadoraResponse[]>(`${this.apiUrl}/operadora`, { headers: headers });
  }
}
