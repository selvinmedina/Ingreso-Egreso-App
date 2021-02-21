import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { TipoIngreso } from '../models/tipo-ingreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';
import { getTypeDescription } from '../shared/helper/helpers';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipoIngreso = TipoIngreso;
  tipo: TipoIngreso;
  uiSubscription: Subscription;
  cargando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(10)]],
    });
    this.tipo = TipoIngreso.Ingreso;

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  guardar() {
    this.store.dispatch(ui.isLoading());

    if (this.ingresoForm.invalid) {
      return;
    }
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this._ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          title: 'Success!',
          text: `The ${getTypeDescription(this.tipo)} is created successfully`,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());

        console.warn(err);
        Swal.fire({
          title: 'Error',
          text: `Oh, there was an error creating the ${getTypeDescription(
            this.tipo
          )}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
