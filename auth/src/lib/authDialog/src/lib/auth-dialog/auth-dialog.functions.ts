import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog.component';

export function authDataDialog(injector: Injector) {
  return injector
    .get(MatDialog)
    .open<AuthDialogComponent>(AuthDialogComponent, {
      minWidth: '350px',
      disableClose: true,
    })
    .afterClosed();
}
