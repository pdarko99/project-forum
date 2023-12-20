/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { SignInFeatureService } from './sign-in-feature.service';
import { Output, EventEmitter } from '@angular/core';
import { NotificationService } from '@project-forum/notification';

import { LoadingService } from '@project-forum/loading';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@project-forum/data-access';

@Component({
  selector: 'project-forum-sign-in-feature',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent {
  @Output() closeDialog = new EventEmitter();
  signInService = inject(SignInFeatureService);
  notificationService = inject(NotificationService);
  authService = inject(AuthService);

  loadingService = inject(LoadingService);

  showLoading = toSignal(this.loadingService.loading$);
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.signInService
      .signIn(form.value.email, form.value.password)
      .subscribe((res) => {
        form.reset();
        this.notificationService.open(res.message);

        this.authService.saveAuthData(res.token, res.firstName, res.expiresIn);
        this.authService.setAuthTimer(res.expiresIn  * 1000);
        this.closeDialog.emit();
        
      });
  }

  demo(){
    this.signInService
    .signIn("k@gmail.com", '123456')
    .subscribe((res) => {
      this.notificationService.open(res.message);
      this.authService.saveAuthData(res.token, res.firstName, res.expiresIn);
      this.authService.setAuthTimer(res.expiresIn  * 1000);
      this.closeDialog.emit();
      
    });
  
  }
}
