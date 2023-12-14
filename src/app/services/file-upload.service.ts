import { enviroment } from './../../enviroments/enviroments';
import { Injectable } from '@angular/core';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await resp.json();
      if(data.ok){
        return data.fileName;
      }else{
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
