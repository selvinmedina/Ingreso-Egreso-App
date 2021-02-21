import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { TipoIngreso } from '../models/tipo-ingreso';

@Pipe({
  name: 'ordenIngreso',
})
export class OrdenIngresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return [...items].sort((a, b) => {
      if (a.tipo === TipoIngreso.Ingreso) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
