import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private fireStore: AngularFirestore,
    private _authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this._authService.user.uid;
    return this.fireStore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }
}
