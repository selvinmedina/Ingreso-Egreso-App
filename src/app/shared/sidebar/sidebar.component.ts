import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombreUsuario: string;
  usuarioSubs: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.usuarioSubs = this.store.select('user').subscribe(({ user }) => {
      this.nombreUsuario = user?.nombre;
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubs.unsubscribe();
  }

  logout() {
    Swal.showLoading();
    this.authService.logout().then(() => {
      Swal.close();
      this.route.navigate(['/login']);
    });
  }
}
