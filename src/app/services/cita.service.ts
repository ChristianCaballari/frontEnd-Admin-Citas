import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from '../../enviroments/enviroments';
import { delay, map, tap } from 'rxjs';
import { CitasCargadas } from '../interfaces/CitasCargadas';
import { Cita } from '../models/Cita';
import { CitaRegister, CitaResponse } from '../interfaces/CitaRegister';

const base_url = enviroment.base_url;



@Injectable({
  providedIn: 'root'
})
export class CitaService {

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

  cargarCitas(desde: number = 0) {
    const url = `${base_url}/citas?desde=${desde}`;
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
          total: resp.total,
          citas,
        };
      })
    );
  }
  
  crearCita(cita: CitaRegister) {
    //http://localhost:3005/api/citas/1/estado/1
    return this.http.post<CitaResponse>(`${base_url}/citas/${cita.idUser}/estado/${cita.idStatus}`, cita);
  }
}
