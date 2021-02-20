import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { TipoIngreso } from 'src/app/models/tipo-ingreso';
import { getTypeDescription } from 'src/app/shared/helper/helpers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[];
  tipoIngreso = TipoIngreso;
  private ingresoEgresoSubs: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingresoEgresoSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => (this.ingresoEgresos = items));
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
  }

  getTypeDescription(type: TipoIngreso){
    return getTypeDescription(type)
  }

  borrar(uid:string){
    console.log(uid);

  }
}
