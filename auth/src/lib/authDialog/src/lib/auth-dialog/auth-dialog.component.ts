/* eslint-disable @nx/enforce-module-boundaries */
import { Component, inject } from '@angular/core';
import { FeatureComponent } from '@project-forum/signUp/feature';
import { FeatureComponent as signInFeature } from '@project-forum/signIn/feature';


import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'project-forum-auth-dialog',
  standalone: true,
  imports: [FeatureComponent, MatTabsModule, signInFeature],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
})
export class AuthDialogComponent  {
  dialogRef = inject(MatDialogRef<AuthDialogComponent>);

 
}
