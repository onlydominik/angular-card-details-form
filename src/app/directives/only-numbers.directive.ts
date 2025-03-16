import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appOnlyNumbers]',
  standalone: true,
})
export class OnlyNumbersDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const initialValue = input.value;

    const sanitizedValue = initialValue.replace(/[^0-9]/g, '');

    if (sanitizedValue !== initialValue) {
      input.value = sanitizedValue;

      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    }
  }

  // Prevent pasting non-digit characters -- STACK OVERFLOW SOLUTION
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text/plain');
    if (pastedText) {
      const sanitizedValue = pastedText.replace(/[^0-9]/g, '');
      document.execCommand('insertText', false, sanitizedValue);
    }
  }
}
