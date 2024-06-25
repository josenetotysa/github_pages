import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { PortabilidadeResponse } from '../../types/portabilidade-response.type';
import { PortabilidadeComponent } from '../../pages/portabilidade/portabilidade.component';

@Injectable({
  providedIn: 'root'
})
export class ListPortabilidadeService {

  private apiUrl: string = 'http://localhost:8080/portabilidade';
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
