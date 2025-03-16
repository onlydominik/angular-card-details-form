import { Component, effect, inject, input } from '@angular/core';
import CONTENT from '../../assets/content.json';
import { BgImageDirective } from '../directives/bg-image.directive';
import { NgOptimizedImage } from '@angular/common';
import { CardDataService } from '../services/card-data.service';

@Component({
  selector: 'app-card-section',
  imports: [BgImageDirective, NgOptimizedImage],
  templateUrl: './card-section.component.html',
  styleUrl: './card-section.component.css',
})
export class CardSectionComponent {
  cardDataService = inject(CardDataService);
  imageBgBackCard = CONTENT['card-section'].images.cardBackPath;
  imageBgFrontCard = CONTENT['card-section'].images.cardFrontPath;
  cardLogo = CONTENT['card-section'].images.cardLogoPath;

  constructor() {
    effect(() => {});
  }
}
