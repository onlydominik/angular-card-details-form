import { FormControl } from '@angular/forms';

interface Card {
  name: string | null;
  number: string | null;
  month: string | null;
  year: string | null;
  cvc: string | null;
}

interface CardForm {
  name: FormControl<string | null>;
  number: FormControl<string | null>;
  month: FormControl<string | null>;
  year: FormControl<string | null>;
  cvc: FormControl<string | null>;
}
export type { Card, CardForm };
