import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { authDataDialog } from '@project-forum/auth-dialog';
import { AuthService } from '@project-forum/data-access';
import { map, shareReplay } from 'rxjs';
import { ThemeManagerService } from './theme-manager/theme-manager.service';
import {HomeFeatureService} from '@project-forum/home/feature';

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

  protected readonly homeService = inject(HomeFeatureService);


  authService = inject(AuthService);

  userData = toSignal(this.authService.selectUserData$, {
    initialValue: { firstName: '', token: '' },
  });

  forumList = toSignal(this.homeService.selectForums$);

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
    if (this.userData().token) {
      return this.authService.checkTokenStatus();
    }
    this.openDialog();
  }
  openDialog() {
    authDataDialog(this.injector).subscribe();
  }
}
