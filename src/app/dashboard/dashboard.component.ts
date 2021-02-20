import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;
  private ingresoEgresoSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.ingresoEgresoSubs = this._ingresoEgresoService
          .ingresoEgresosListener(user.uid)
          .subscribe((items) => {
            this.store.dispatch(ingresoEgresoActions.setItems({ items }));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresoEgresoSubs.unsubscribe();
  }
}
