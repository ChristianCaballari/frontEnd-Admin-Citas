import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForm';
import { ResponseToken } from '../interfaces/ResponseToken';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
import { Usuario } from '../models/Usuario';
import { LoginForm } from '../interfaces/LoginForm';
import { UsuarioLogueado } from '../interfaces/UsuarioLogueado';
import { UsuarioPerfil } from '../interfaces/UsuarioPerfil';
import { UsuariosCargados } from '../interfaces/Usuario-matenimiento';
import { CitasCargadas } from '../interfaces/CitasCargadas';
import { Cita } from '../models/Cita';


const base_url = enviroment.base_url;


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role():string {
    return this.usuario.role || '';
  }
  
  get id():string {
    return this.usuario.id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validarToken(): Observable<boolean> {
    // console.log('En el renew ',localStorage.getItem('token'));
    return this.http
      .get<UsuarioLogueado>(`${base_url}/login/renew`, this.headers)
      .pipe(
        map((resp: UsuarioLogueado) => {
          const { email, name, role, img = '', id } = resp.usuario;
          this.usuario = new Usuario(name, email, '', img, role,id);

          this.guardarLocalStorage(resp.token, resp.menu);

          return true;
        }),
        catchError((error) => of(false))
      );
  }
  
  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    // TODO: Borrar menu
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post<ResponseToken>(`${base_url}/usuarios`, formData).pipe(
      tap((resp: ResponseToken) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }
    // actualizarPerfil(data: {emai:string, nombre:string}){}otra forma de recibir data
    actualizarPerfil(perfil: UsuarioPerfil) {
      perfil = {
        ...perfil,
        role: this.usuario.role ||'',
      };

      return this.http.put<ResponseToken>(
        `${base_url}/usuarios/${this.id}`,
        perfil,
        this.headers
      );
    }

    
  login(formData: LoginForm) {
    return this.http.post<ResponseToken>(`${base_url}/login`, formData).pipe(
      tap((resp: ResponseToken) => {
        console.log(resp);
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  cargarUsuarios(desde: number = 0,paginado:number) {
    const url = `${base_url}/usuarios/${paginado}?desde=${desde}`;
    return this.http.get<UsuariosCargados>(url, this.headers).pipe(
      delay(1000),
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.name,
              user.email,
              '',
              user.img,
              user.role,
              user.id
            )
        );
        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.id}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put<ResponseToken>(
      `${base_url}/usuarios/${usuario.id}`,
      usuario,
      this.headers
    );
  }

  cargarCitasPorUsuario(id: number) {
    const url = `${base_url}/usuarios/${id}/citas`;
    return this.http.get<CitasCargadas>(url, this.headers).pipe(
      delay(1000),
      map((resp) => {
        console.log(resp);
        const citas = resp.citas.map(
          (cita) =>
            new Cita(
              cita.title,
              cita.note,
              cita.message,
              cita.appointmentDate,
              cita.created,
              cita.estado,
              cita.usuario,
              cita.id
            )
        );
        console.log(citas);
        return {
          citas,
        };
      })
    );
  }
}
