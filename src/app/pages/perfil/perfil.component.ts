import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { FileUploadService } from '../../services/file-upload.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ResponseToken } from '../../interfaces/ResponseToken';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp : any = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService){
    this.perfilForm = this.fb.group({});
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.usuario.name,Validators.required],
      email: [this.usuario.email,[Validators.required,Validators.email]]
    });
  }


  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(
      {next: (resp:ResponseToken) =>{
        const {name, email} = this.perfilForm.value;
        this.usuario.name = name;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (err)=>{
        Swal.fire('Error',err.error.msg,'error');
       }
    });
  }

  cambiarImagen( file: File ) {
    
    this.imagenSubir = file;

    if ( !file ) { return }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
   
  }
  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios', this.usuario.id||'')
    .then(img => {
      this.usuario.img=img;
      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err)=>{
      Swal.fire('Error', err.msg, 'error');
    })
   }


}
