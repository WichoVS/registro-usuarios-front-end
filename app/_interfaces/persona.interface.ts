import { IEntidadFederativa } from "./entidad-federativa.interface";
import { IEstadoCivil } from "./estado-civil.interface";
import { IGenero } from "./genero.interface";

export interface IPersona {
  CURP: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  EntidadFederativaNacimiento: IEntidadFederativa;
  EstadoCivil: IEstadoCivil;
  Genero: IGenero;
}
