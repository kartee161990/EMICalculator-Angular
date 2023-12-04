import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../model/Data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  sendDataToApi(data: Data): Observable<any> {
    console.log('Form data service successfully', data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/loan`, data, { headers });
  }
}