import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = new FormGroup({
    fullName: new FormControl(null, { validators: Validators.required }),
    email: new FormControl(null, { validators: Validators.compose([Validators.required, Validators.email]) }),
    password: new FormControl(null, { validators: Validators.required }),
  });

  register() {
    this.authService.register(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.router.navigate(['/notes']);
      });
  }
}
