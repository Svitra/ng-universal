import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Welcome to the Book App');
    this.meta.updateTag({
      name: 'description',
      content: 'Welcome to the library',
    });
  }
}
