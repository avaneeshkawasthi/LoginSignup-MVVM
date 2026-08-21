import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { readApiError } from '../../../core/http/read-api-error';

@Injectable()
export class LoginViewModel {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly submitting = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    this.errorMessage.set('');
    const { username, password } = this.form.getRawValue();

    if (!username && !password) {
      this.errorMessage.set('Please provide username and password.');
      return;
    }
    if (!username) {
      this.errorMessage.set('Username field is empty.');
      this.form.controls.username.markAsTouched();
      return;
    }
    if (!password) {
      this.errorMessage.set('Password field is empty.');
      this.form.controls.password.markAsTouched();
      return;
    }

    this.submitting.set(true);
    this.auth.login(username, password).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl('/app');
      },
      error: (error) => {
        this.errorMessage.set(readApiError(error, 'Username & password Error'));
        this.submitting.set(false);
      }
    });
  }
}
