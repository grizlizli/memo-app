import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = new FormGroup({
    email: new FormControl('admin@localhost', { validators: Validators.compose([Validators.required, Validators.email]) }),
    password: new FormControl('12345Aa!', { validators: Validators.required }),
  });

  login() {
    this.authService.login({email: 'admin@localhost', password: '12345Aa!'})
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/notes']);
      });

  }
}
