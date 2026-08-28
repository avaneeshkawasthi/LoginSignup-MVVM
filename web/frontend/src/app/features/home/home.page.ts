import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  readonly stats = [
    { value: '12k', label: 'Vehicles orchestrated' },
    { value: '98.4%', label: 'On-time dispatch' },
    { value: '41', label: 'Cities live' }
  ];

  readonly pillars = [
    {
      title: 'Live dispatch',
      copy: 'See every asset, crew, and exception on one operational canvas.'
    },
    {
      title: 'Secure access',
      copy: 'Operator accounts, JWT sessions, and guarded routes from day one.'
    },
    {
      title: 'Scalable core',
      copy: 'Feature modules, repository persistence, and a swap-ready SQLite layer.'
    }
  ];
}
