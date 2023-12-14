import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuario } from '../../../models/Usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[]=[];
  public usuariosTemp: Usuario[]=[];

  public imgSubs!: Subscription;
  public desde:number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService:UsuarioService,
    //private busquedasService:BusquedasService
    ){
  }

  ngOnInit():void{
    this.cargarUsuarios();
 }

  cargarUsuarios(){
    this.cargando = true;
    let paginado = 1;
    this.usuarioService.cargarUsuarios(this.desde,paginado).subscribe(({total,usuarios})=>{
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.totalUsuarios = total;
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number){
    
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios){
      this.desde -=valor;
    }
    this.cargarUsuarios();
  }

  public eliminarUsuario(usuario: Usuario){
    if(usuario.id === this.usuarioService.id){
      return (Swal.fire('Error','No puede borrar asimismo','error'));
    }

    Swal.fire({
      title: "Borrar Usuario?",
      text: `Estas apunto de borrar a ${usuario.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(
         resp=>{
          Swal.fire({
            title: "Usuario borrado!",
            text: `${usuario.name} fue eliminado correctamente`,
            icon: "success"
          });
          this.cargarUsuarios();
         }
        );    
      }
    });
    return;
  }

    cambiarRole(usuario:Usuario){
      this.usuarioService.guardarUsuario(usuario)
         .subscribe(resp => {
         });
     }

}
