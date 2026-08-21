import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-page',
  imports: [RouterLink],
  templateUrl: './services.page.html',
  styleUrl: './services.page.scss'
})
export class ServicesPage {
  readonly services = [
    {
      title: 'Operator identity',
      copy: 'Login, signup, session restore, and route guards with JWT-backed access.'
    },
    {
      title: 'Fleet directory',
      copy: 'A protected directory of contacts, mirrored from the original users screen.'
    },
    {
      title: 'Dispatch insights',
      copy: 'A calm dashboard for the people who keep vehicles, crews, and customers aligned.'
    },
    {
      title: 'Field communications',
      copy: 'A contact desk that stores inbound requests in SQLite for follow-up.'
    }
  ];
}
