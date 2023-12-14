import { Usuario } from './../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    console.log(usuarioService.usuario);
    this.usuario = usuarioService.usuario;
  }
  logout() {
    this.usuarioService.logout();
  }
}
