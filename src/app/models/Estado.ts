import { enviroment } from '../../enviroments/enviroments';

const base_url = enviroment.base_url;

export class Estado {
     constructor(
         public name: string,
         public id?: string,
     ) {}
 }