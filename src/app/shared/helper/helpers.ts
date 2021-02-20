import { TipoIngreso } from 'src/app/models/tipo-ingreso';

export function getTypeDescription(tipo: TipoIngreso) {
  switch (tipo) {
    case TipoIngreso.Ingreso:
      return 'Ingreso';
    case TipoIngreso.Egreso:
      return 'Egreso';
      break;

    default:
      break;
  }
}
