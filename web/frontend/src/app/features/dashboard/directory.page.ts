import { Component, inject, OnInit } from '@angular/core';
import { DirectoryViewModel } from './directory.view-model';

@Component({
  selector: 'app-directory-page',
  providers: [DirectoryViewModel],
  templateUrl: './directory.page.html',
  styleUrl: './directory.page.scss'
})
export class DirectoryPage implements OnInit {
  readonly vm = inject(DirectoryViewModel);

  ngOnInit(): void {
    this.vm.load();
  }
}
