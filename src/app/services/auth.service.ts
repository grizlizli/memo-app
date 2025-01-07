import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs';

export interface AuthPayload {
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface AuthenticationResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #token: string | null = null;
  private readonly apiService = inject(ApiService);

  login(payload: AuthPayload) {
    return this.apiService.post<AuthenticationResponse>('auth/login', payload)
      .pipe(
        tap((response) => this.setAuthToken(response.token))
      );
  }

  register(payload: AuthPayload) {
    return this.apiService.post<AuthenticationResponse>('auth/register', payload)
      .pipe(
        tap((response) => this.setAuthToken(response.token))
      );
  }

  getAuthToken(): string | null{
    return this.#token;
  }

  private setAuthToken(token: string | null) {
    this.#token = token;
  }
}
