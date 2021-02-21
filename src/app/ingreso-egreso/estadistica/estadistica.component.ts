import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { TipoIngreso } from 'src/app/models/tipo-ingreso';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;

  totalIngresos: number;
  totalEgresos: number;

  constructor(private store: Store<AppState>) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
  }

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    items.forEach((item) => {
      switch (item.tipo) {
        case TipoIngreso.Ingreso:
          this.totalIngresos += item.monto;
          this.ingresos++;
          break;
        case TipoIngreso.Egreso:
          this.totalEgresos += item.monto;
          this.egresos++;
          break;
        default:
          break;
      }
    });
  }
}
