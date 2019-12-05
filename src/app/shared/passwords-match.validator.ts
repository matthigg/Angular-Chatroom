import { FormGroup, ValidationErrors } from '@angular/forms';

export function passwordsMatch(formGroup: FormGroup): ValidationErrors | null {
  const password = formGroup.get('password').value;
  const passwordRetype = formGroup.get('passwordRetype').value;
  return password === passwordRetype ? null : { 'noMatch': true };
};