import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  _snackBar = inject(MatSnackBar);

  open(message: string, panelClass = 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass,
    });
  }
}
