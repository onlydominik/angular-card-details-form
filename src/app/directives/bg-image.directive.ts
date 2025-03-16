import {Directive, input, ElementRef, effect} from '@angular/core';

@Directive({
  selector: 'div[appBgImage], section[appBgImage]',
  standalone: true
})
export class BgImageDirective {
  appBgImage = input.required<string>();

  constructor(private el: ElementRef) {
    effect(() => {
      const imagePath = this.appBgImage();
      this.el.nativeElement.style.backgroundImage = `url("${imagePath}")`;
    });
  }
}
