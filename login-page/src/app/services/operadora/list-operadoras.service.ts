import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { OperadoraResponse } from '../../types/operadora-response.type';

@Injectable({
  providedIn: 'root'
})
export class ListOperadorasService {

  private apiUrl: string = 'http://localhost:8080/operadora';
  private operadorasUpdatedSubject = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  listOperadoras(): Observable<OperadoraResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<OperadoraResponse[]>(`${this.apiUrl}/list`, { headers: headers });
  }
  
  getOperadorasUpdatedObservable(): Observable<void> {
    return this.operadorasUpdatedSubject.asObservable();
  }

  notifyOperadorasUpdated(): void {
    this.operadorasUpdatedSubject.next();
    console.log("fui notificado!!!")
  }
}
