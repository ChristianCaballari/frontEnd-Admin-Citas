import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseToken } from '../../interfaces/ResponseToken';
import { UsuarioService } from '../../services/usuario.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
  ]
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm : FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || 'chrisAdmin@gmail.com' , [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    remember: [false]
  });
  
  constructor( private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
     ) { }


     campoNoValido(campo:string): boolean{
      // let isValid : boolean= false;
      if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
        return  true;
      }else{
        return false;
      }
    }
  login(){
    this.formSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    //Realizar el posteo
    this.usuarioService.login(this.loginForm.value)
    .subscribe(
      {next: (resp:ResponseToken)=>{
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value );   
        }else{
          localStorage.removeItem('email');
        }
        //Redireccionar al dashboard
        this.router.navigateByUrl('/');
      },
      error: (err)=> 
          {
           //Si sucede un error
           console.log(err);
           Swal.fire('Error',err.error.msg,'error');
          },
       });
    }  

}
