import { Component } from '@angular/core';
import { CardSectionComponent } from './card-section/card-section.component';
import { CardFormComponent } from './card-form/card-form.component';

@Component({
  selector: 'app-root',
  imports: [CardSectionComponent, CardFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
