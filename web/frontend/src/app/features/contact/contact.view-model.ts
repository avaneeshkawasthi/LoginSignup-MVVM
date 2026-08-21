import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiClient } from '../../core/http/api.client';
import { readApiError } from '../../core/http/read-api-error';

@Injectable()
export class ContactViewModel {
  private readonly api = inject(ApiClient);
  private readonly fb = inject(FormBuilder);

  readonly submitting = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    topic: ['Operations', Validators.required],
    message: ['', [Validators.required, Validators.minLength(12)]]
  });

  submit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Please complete the form before sending.');
      return;
    }

    this.submitting.set(true);
    this.api.submitContact(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
        this.form.reset({ topic: 'Operations' });
        this.submitting.set(false);
      },
      error: (error) => {
        this.errorMessage.set(readApiError(error, 'Unable to send your message.'));
        this.submitting.set(false);
      }
    });
  }
}
