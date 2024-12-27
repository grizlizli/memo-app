import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINT_URL } from '../providers/api-endpoint.provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_ENDPOINT_URL = inject(API_ENDPOINT_URL);
  private readonly http = inject(HttpClient);

  get<T = unknown>(route: string): Observable<T> {
    return this.http.get<T>(`${this.API_ENDPOINT_URL}/${route}`);
  }

  post<T = unknown, K = any>(route: string, body: K): Observable<T> {
    return this.http.post<T>(`${this.API_ENDPOINT_URL}/${route}`, body);
  }

  patch<T = unknown, K = Partial<T>>(route: string, body: K): Observable<T> {
    return this.http.patch<T>(`${this.API_ENDPOINT_URL}/${route}`, body);
  }

  delete<T = unknown>(route: string): Observable<T> {
    return this.http.delete<T>(`${this.API_ENDPOINT_URL}/${route}`);
  }
}
