import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseToken } from '../../interfaces/ResponseToken';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  styles: [
  ]
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Christian', [Validators.required,Validators.minLength(3)]],
    email: ['test100@gmail.com',[Validators.required,Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required]
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder, 
              private usuarioService:UsuarioService,
              private router: Router){
  }

  crearUsuario(){

    this.formSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }

    console.log(this.registerForm.value);
    //Realizar el posteo.
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(
      {next: (resp: ResponseToken)=> {this.router.navigateByUrl('/dashboard')},
          error: (err)=> 
          {
           //Si sucede unerror
           Swal.fire('Error',err.error.msg,'error');
          },
       })
  }

  campoNoValido(campo:string): boolean{
    // let isValid : boolean= false;
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return  true;
    }else{
      return false;
    }
  }
  aceptaTerminos(){
     return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( (pass1 !== pass2 || !pass1) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name:string, pass2Name: string){
    
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }
}
