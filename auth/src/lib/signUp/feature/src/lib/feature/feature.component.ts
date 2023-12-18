/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatcher } from '@project-forum/util';
import { SignUpFeatureService } from './sign-up-feature.service';
import { Output, EventEmitter } from '@angular/core';
import { NotificationService } from '@project-forum/notification';
import { LoadingService } from '@project-forum/loading';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@project-forum/data-access';


@Component({
  selector: 'project-forum-sign-up-feature',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent {
  @Output() closeDialog = new EventEmitter();

  authService = inject(AuthService);

  loadingService = inject(LoadingService);

  showLoading = toSignal(this.loadingService.loading$);

  signUpService = inject(SignUpFeatureService);

  notificationService = inject(NotificationService);

  private fb = inject(FormBuilder);

  signUpForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],

    lastName: ['', [Validators.required]],

    email: ['', [Validators.required, Validators.email]],

    passwordGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],

        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatcher }
    ),
  });

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    const userData = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.passwordGroup.password,
    };

    this.signUpService.signUp(userData).subscribe((res) => {
      this.signUpForm.reset();
      this.notificationService.open(res.message);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + res.expiresIn * 1000);

      this.authService.saveAuthData(res.token, expirationDate, res.userId, res.firstName);
      this.authService.setAuthTimer(res.expiresIn);
      this.closeDialog.emit();
    });
  }
}
