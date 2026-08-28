import { Injectable, inject, signal } from '@angular/core';
import { DirectoryUser } from '../../core/models/app.models';
import { ApiClient } from '../../core/http/api.client';
import { readApiError } from '../../core/http/read-api-error';

@Injectable()
export class DirectoryViewModel {
  private readonly api = inject(ApiClient);

  readonly users = signal<DirectoryUser[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  load(): void {
    this.loading.set(true);
    this.api.directory().subscribe({
      next: ({ users }) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(readApiError(error, 'Unable to load the directory.'));
        this.loading.set(false);
      }
    });
  }
}
