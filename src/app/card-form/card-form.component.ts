import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardDataService } from '../services/card-data.service';
import { Card, CardForm } from '../models/card.model';
import CONTENT from '../../assets/content.json';
import { OnlyNumbersDirective } from '../directives/only-numbers.directive';
import { TextFormatCreditCardDirective } from '../directives/text-format-credit-card.directive';
import { NgClass, NgOptimizedImage } from '@angular/common';

const subscribeControl = (
  control: FormControl<string | null>,
  placeholder: string,
  updateFunction: (value: string) => void,
) => {
  // Initialize with placeholder
  updateFunction(placeholder);

  control.valueChanges.subscribe((value) => {
    if (value === null || value === '') {
      updateFunction(placeholder);
      return;
    }
    updateFunction(value);
  });
};

@Component({
  selector: 'app-card-form',
  imports: [
    ReactiveFormsModule,
    OnlyNumbersDirective,
    TextFormatCreditCardDirective,
    NgClass,
    NgOptimizedImage,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css',
})
export class CardFormComponent {
  protected readonly CONTENT = CONTENT;
  private currentYear = new Date().getFullYear().toString().slice(2, 4);
  formSubmittedCorrectly = signal(false);
  form = new FormGroup<CardForm>({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+\s+[a-zA-Z]+(\s+[a-zA-Z]+)*$/),
      ],
    }),
    number: new FormControl('', {
      validators: [Validators.required, Validators.minLength(19)],
    }),

    month: new FormControl('', {
      validators: [Validators.required, Validators.min(1), Validators.max(12)],
    }),

    year: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(+this.currentYear),
        Validators.max(+this.currentYear + 5),
      ],
    }),
    cvc: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  private initializeSubscriptions() {
    const placeholders = CONTENT['card-section'].placeholders;
    console.log(this.currentYear);
    // Create a mapping between form keys and placeholder keys
    const keyMapping: Record<keyof CardForm, keyof typeof placeholders> = {
      name: 'name',
      number: 'cardNumber',
      month: 'month',
      year: 'year',
      cvc: 'cvc',
    };

    Object.entries(this.form.controls).forEach(([key, control]) => {
      const formKey = key as keyof CardForm;
      const placeholderKey = keyMapping[formKey];

      subscribeControl(
        control as FormControl<string | null>,
        placeholders[placeholderKey],
        (value) =>
          this.CardDataService.saveCardInputData(formKey as keyof Card, value),
      );
    });
  }

  constructor(private CardDataService: CardDataService) {
    this.initializeSubscriptions();
  }

  isFieldInvalid(formControlName: string): boolean {
    const control = this.form.get(formControlName);
    return !!(control?.touched && control.invalid);
  }

  hasDateRangeError(): boolean | undefined {
    return (
      this.form.get('month')?.hasError('min') ||
      this.form.get('month')?.hasError('max') ||
      this.form.get('year')?.hasError('min') ||
      this.form.get('year')?.hasError('max')
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted correctly');
      this.formSubmittedCorrectly.set(true);
    }
  }

  onContinue() {
    this.form.reset();
    this.formSubmittedCorrectly.set(false);
  }

  labelClasses = 'flex flex-col gap-[0.5625rem] text-xs tracking-[2px] ';
  inputClasses =
    'border-light-grey text-deep-violet h-[2.8125rem] w-full rounded-lg border-1 px-4 text-lg  tracking-normal  focus:outline-none focus:ring-2  focus:border-transparent hover:cursor-pointer';
  inputInvalid = 'border-red focus:ring-red';
  invalidMessageClasses = 'text-red text-xs tracking-normal w-fit text-red';
}
