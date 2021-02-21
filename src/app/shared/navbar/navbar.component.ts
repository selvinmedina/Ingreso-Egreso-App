import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  nombreUsuario: string;
  usuarioSubs: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.usuarioSubs = this.store
      .select('user')
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user: { nombre } }) => {
        this.nombreUsuario = nombre;
      });
  }

  ngOnDestroy(): void {
    this.usuarioSubs.unsubscribe();
  }
}
