import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { TipoIngreso } from 'src/app/models/tipo-ingreso';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

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

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateWithIngresoEgreso>) {
    this.resetValores();
  }

  private resetValores() {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.generarEstadistica(items);
    });
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.resetValores();
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

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }
}
