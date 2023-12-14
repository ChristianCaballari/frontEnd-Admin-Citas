import { enviroment } from '../../enviroments/enviroments';

const base_url = enviroment.base_url;

export class Usuario {

     constructor(
         public name: string,
         public email: string,
         public password?: string,
         public img?: string,
         public role?: string,
         public id?: string,
     ) {}
 
     get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }
     }
 }

 //http://localhost:3005/api/upload/usuarios/no-img.jpg