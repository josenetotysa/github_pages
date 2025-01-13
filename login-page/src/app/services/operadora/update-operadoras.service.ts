import { Injectable } from '@angular/core';
import { OperadoraResponse } from '../../types/operadora-response.type';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UpdateOperadorasService {


  private apiUrl: string = 'http://10.21.255.127:8080/login_auth_api/operadora';

  constructor(private httpClient: HttpClient) { }

  updateOperadoras(routernumber: string, telcomap: string, releasenumber: number): Observable<OperadoraResponse[]> {
    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<OperadoraResponse[]>(`${this.apiUrl}/update`, { routernumber, telcomap, releasenumber }, { headers: headers })
  }

}
