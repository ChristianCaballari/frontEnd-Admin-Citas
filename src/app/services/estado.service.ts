import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';
import { enviroment } from '../../enviroments/enviroments';
import { EstadosCargadas } from '../interfaces/EstadosCargados';
import { Estado } from '../models/Estado';


const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarEstados() {
    const url = `${base_url}/estados`;
    return this.http.get<EstadosCargadas>(url, this.headers).pipe(
      delay(1000),
      map((resp) => {
        console.log(resp);
        const estados = resp.estados.map(
          (estado) =>
            new Estado(
              estado.name,
              estado.id
            )
        );
        return {
          estados,
        };
      })
    );
  }
}
