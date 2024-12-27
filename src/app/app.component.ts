import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly router = inject(Router);

  private readonly currentRoute = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event.url)),
  );

  readonly disableNewNoteButton = computed(() => {
    const currentRoute = this.currentRoute();

    return currentRoute === '/auth/login' || currentRoute === '/notes/new';
  })

  readonly title = 'MemoApp';
}
