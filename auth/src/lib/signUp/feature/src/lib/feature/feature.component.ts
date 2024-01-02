/* eslint-disable @nx/enforce-module-boundaries */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@project-forum/data-access';
import { LoadingService } from '@project-forum/loading';
import { NotificationService } from '@project-forum/notification';
import { passwordMatcher } from '@project-forum/util';
import { SignUpFeatureService } from './sign-up-feature.service';

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

    passwordGroup: this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()=^#])([A-Za-z\d@$!%*?&()=^#]){8,}$/
          ),
        ],
      ],

      confirmPassword: ['', [Validators.required, passwordMatcher]],
    }),
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

      this.authService.saveAuthData(res.token, res.firstName, res.expiresIn);
      this.authService.setAuthTimer(res.expiresIn * 1000);
      this.closeDialog.emit();
    });
  }
}
