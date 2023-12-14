export interface UsuarioLogueado {
     ok:boolean,
     token:string,
     menu:any,
     usuario:{
     name:string,
     email:string,
     img?: string,
     role?: string,
     id?: string,
   }
}