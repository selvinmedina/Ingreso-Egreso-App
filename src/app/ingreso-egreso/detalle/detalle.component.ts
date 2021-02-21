import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { TipoIngreso } from 'src/app/models/tipo-ingreso';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { getTypeDescription } from 'src/app/shared/helper/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[];
  tipoIngreso = TipoIngreso;
  private ingresoEgresoSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => (this.ingresoEgresos = items));
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
  }

  getTypeDescription(type: TipoIngreso) {
    return getTypeDescription(type);
  }

  borrar(uid: string) {
    this._ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(()=> {
      Swal.fire({
        title: 'Success!',
        text: `The item are deleted successfully`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    })
    .catch((err)=>{
      console.warn(err);
        Swal.fire({
          title: 'Error',
          text: `Oh, there was an error deleting the item`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
    })
  }
}
