import { Injectable, signal } from '@angular/core';
import type { Card } from '../models/card.model';
import CONTENT from '../../assets/content.json';

@Injectable({
  providedIn: 'root',
})
export class CardDataService {
  // Mapping between card fields and placeholder keys
  private placeholderKeys: Record<
    keyof Card,
    keyof (typeof CONTENT)['card-section']['placeholders'] | null
  > = {
    name: 'name',
    number: 'cardNumber',
    month: 'month',
    year: 'year',
    cvc: 'cvc',
  };

  data = signal<Card>({
    name: CONTENT['card-section'].placeholders.name,
    number: CONTENT['card-section'].placeholders.cardNumber,
    month: CONTENT['card-section'].placeholders.month,
    year: CONTENT['card-section'].placeholders.year,
    cvc: CONTENT['card-section'].placeholders.cvc,
  });

  saveCardInputData(inputName: keyof Card, inputValue: string | null) {
    this.data.update((value) => {
      const placeholderKey = this.placeholderKeys[inputName];

      // If there's no placeholder or inputValue is provided, use inputValue or empty string
      if (placeholderKey === null) {
        return { ...value, [inputName]: inputValue ?? '' };
      }

      // Otherwise use the mapped placeholder value
      return {
        ...value,
        [inputName]: inputValue,
      };
    });
  }
}
