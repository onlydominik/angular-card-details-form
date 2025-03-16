import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextFormatCreditCard]',
})
export class TextFormatCreditCardDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const initialValue = input.value;

    const sanitizedValue = initialValue
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();

    if (sanitizedValue !== initialValue) {
      input.value = sanitizedValue;

      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    }
  }
}
