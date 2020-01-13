// https://jasonwatmore.com/post/2018/11/10/angular-7-template-driven-forms-validation-example

import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

import { MustMatch } from './must-match.validator';

@Directive({
  selector: '[mustMatch]',
  providers: [
    { 
      provide: NG_VALIDATORS, 
      useExisting: CheckPasswordsMatchDirective, 
      multi: true 
    }
  ],
})
export class CheckPasswordsMatchDirective implements Validator {
  @Input('mustMatch') mustMatch: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
    return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }
}
