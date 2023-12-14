import { Cita } from "../models/Cita";

export interface  CitaResponse {
     ok: string;
     msg:string;
     cita: Cita
}

export interface CitaRegister{
     title: string,
     note: string,
     message?: string,
     appointmentDate?: string,
     idStatus?: string,
     idUser?: string,
     idUserCreated :string,
}