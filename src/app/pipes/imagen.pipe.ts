import { Pipe, PipeTransform } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';

const base_url = enviroment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'): string {
    
    let imgUrl = '';
    if(!img){
      imgUrl= `${base_url}/upload/${tipo}/no-image`;
    }else if(img.includes('https')){
       imgUrl = img;
    }else if(img){
      imgUrl= `${base_url}/upload/${tipo}/${img}`;
    }else{
      imgUrl= `${base_url}/upload/${tipo}/no-image`;
    }

    return imgUrl;
  }
}
