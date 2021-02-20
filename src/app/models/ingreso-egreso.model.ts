import { TipoIngreso } from './tipo-ingreso';

export class IngresoEgreso {
  constructor(
    // public uid: string,
    public descripcion: string,
    public monto: number,
    public tipo: TipoIngreso
  ) {}
}
