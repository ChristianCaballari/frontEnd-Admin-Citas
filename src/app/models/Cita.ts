import { enviroment } from '../../enviroments/enviroments';

const base_url = enviroment.base_url;

export class Cita {

     constructor(
         public title: string,
         public note: string,
         public message?: string,
         public appointmentDate?: string,
         public created?: string,
         public estado?: string,
         public usuario?: string,
         public id?: string,
     ) {}
 }