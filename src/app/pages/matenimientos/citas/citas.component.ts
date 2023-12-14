import { CitaService } from './../../../services/cita.service';
import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/Cita';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit {

  public totalCitas: number = 0;
  public citas: Cita[]=[];

  public desde:number = 0;
  public cargando: boolean = true;
  
  constructor(private citaService: CitaService){

  }

  ngOnInit():void{

    this.cargarCitas();
 }

 cargarCitas(){
  this.cargando = true;
  this.citaService.cargarCitas(this.desde).subscribe(({total,citas})=>{
    console.log(citas);
    this.citas = citas;
    this.totalCitas = total;
    this.cargando = false;
  });
 }

 cambiarPagina(valor: number){
    
  this.desde += valor;

  if(this.desde < 0){
    this.desde = 0;
  }else if(this.desde >= this.totalCitas){
    this.desde -=valor;
  }
  this.cargarCitas();
}

eliminarCita(cita:Cita){

}
}
