import { TipoIngreso } from './tipo-ingreso';

export class IngresoEgreso {
  public uid?: string;
  constructor(
    // public uid: string,
    public descripcion: string,
    public monto: number,
    public tipo: TipoIngreso
  ) {}
}
