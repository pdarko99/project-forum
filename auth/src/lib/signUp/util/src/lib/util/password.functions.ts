import { AbstractControl } from '@angular/forms';

export function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine) {
    return null;
  }
  if (passwordControl?.value === confirmPassword?.value) {
    return null;
  }
  return { match: true };
}
