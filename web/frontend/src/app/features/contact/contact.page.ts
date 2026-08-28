import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactViewModel } from './contact.view-model';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule],
  providers: [ContactViewModel],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {
  readonly vm = inject(ContactViewModel);
}
