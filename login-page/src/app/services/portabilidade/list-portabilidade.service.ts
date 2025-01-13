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

  listPortabilidade(): Observable<PortabilidadeResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<PortabilidadeResponse[]>(`${this.apiUrl}/list`, { headers: headers });
  }

  getPortabilidadeUpdatedObservable(): Observable<void> {
    return this.portabilidadeUpdatedSubject.asObservable();
  }

  notifyPortabilidadeUpdated(): void {
    this.portabilidadeUpdatedSubject.next();
  }
}
