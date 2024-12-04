import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PortabilidadeResponse } from '../../types/portabilidade-response.type';



@Injectable({
  providedIn: 'root'
})
export class UpdatePortabilidadeService {

  
  private apiUrl: string = 'http://10.21.255.127:8080/login_auth_api/portabilidade';

  constructor(private httpClient: HttpClient) { }

  updatePortabilidade(realnumber: string, virtualnumber: string): Observable<PortabilidadeResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<PortabilidadeResponse[]>(`${this.apiUrl}/update`,  {realnumber, virtualnumber} , { headers: headers })
  }

}
