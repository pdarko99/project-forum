import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeManagerService } from './theme-manager/theme-manager.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { authDataDialog } from '@project-forum/auth-dialog';
import { AuthService } from '@project-forum/data-access';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  selector: 'project-forum-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  protected readonly injector = inject(Injector);
  authService = inject(AuthService);

  userData = toSignal(this.authService.selectUserData$, {
    initialValue: { id: '', firstName: '' },
  });

  title = 'project-forum';
  themeManager = inject(ThemeManagerService);

  isDark = toSignal(this.themeManager.isDark$);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  ngOnInit(): void {
    // const authInformation = this.authService.getAuthData();
    // if (!authInformation) {
    this.openDialog();
    // }
    // this.authService.autoAuthUser(authInformation.expirationDate);
  }
  openDialog() {
    authDataDialog(this.injector).subscribe();
  }
}
