import { CitaService } from './../../../services/cita.service';
import { EstadoService } from './../../../services/estado.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { Estado } from '../../../models/Estado';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CitaRegister, CitaResponse } from '../../../interfaces/CitaRegister';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styles: [
  ]
})
export class CitaComponent implements OnInit {

  public usuarios: Usuario[]=[];
  public estados: Estado[]=[];
  public formSubmitted = false;
  public defaultValue: any = '1';

  
  public citaRegister: CitaRegister = {
    title: '',
    note: '',
    message: '',
    appointmentDate: '',
    idStatus: '',
    idUser: '',
    idUserCreated :'',
  }
  

  public registerForm = this.fb.group({
    title: ['', [Validators.required,Validators.minLength(3)]],
    note: ['', [Validators.required,Validators.minLength(3)]],
    message: ['', [Validators.required,Validators.minLength(3)]],
    appointmentDate: ['', [Validators.required,Validators.minLength(3)]],
    idUser: ['', [Validators.required]],
    idEstado: ['', [Validators.required]],
   // idUserCreated: ['', [Validators.required,Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private estadoService: EstadoService,
    private citaService: CitaService,
    private router: Router
    //private busquedasService:BusquedasService
    ){
  }

  ngOnInit():void{
    this.cargarUsuarios();
    this.cargarEstados();
    this.registerForm.get('idEstado')?.setValue(this.defaultValue);
 }

 buildDate(date:string){

  let fecha = new Date(date);
  let fe = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}.${fecha.getMilliseconds()}`;

 }
 crearCita(){
  this.formSubmitted = true;
  if(this.registerForm.invalid){
    return;
  } 
  if(this.registerForm.get('idUser')?.value === this.usuarioService.id.toString()){
    return (Swal.fire('Upps','No puede agendar citas asimismo','warning'));
  }

  if((new Date().getTime() > new Date(this.registerForm.get('appointmentDate')?.value||'').getTime()))
  {
    return (Swal.fire('Upps','No puede agendar citas en fechas no validas','warning'));
    
  }
  //INSERTAR CITA
  this.citaRegister.title = this.registerForm.get('title')?.value||'';
  this.citaRegister.note =  this.registerForm.get('note')?.value||'';;
  this.citaRegister.message =  this.registerForm.get('message')?.value||'';;
  this.citaRegister.appointmentDate =  this.registerForm.get('appointmentDate')?.value||'';;
  this.citaRegister.idStatus =  this.registerForm.get('idEstado')?.value||'';;
  this.citaRegister.idUser =  this.registerForm.get('idUser')?.value||'';;
  this.citaRegister.idUserCreated = this.usuarioService.id.toString();
  console.log(new Date().getDate());
  this.citaService.crearCita(this.citaRegister).subscribe(
    {next: (resp:CitaResponse)=>{
       if(resp.ok){
        Swal.fire(
          'Creado',
          `Cita creada correctamente`,
          'success'
        );
       }
      //Redireccionar al dashboard
      this.router.navigateByUrl('/citas');
    },
    error: (err)=> 
        {
         console.log(err);
         Swal.fire('Error','No se pudo crear la cita','error');
        },
     });
  return;
 }


 campoNoValido(campo:string): boolean{
  // let isValid : boolean= false;
  if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
    return  true;
  }else{
    return false;
  }
}
  cargarUsuarios(){
  
    let paginado = 0;
    this.usuarioService.cargarUsuarios(0,paginado).subscribe(({usuarios})=>{
      console.log(usuarios);
      this.usuarios = usuarios;
    });
  }

  cargarEstados(){
    this.estadoService.cargarEstados().subscribe(({estados})=>{
      console.log(estados);
      this.estados = estados;
    });
  }
}
