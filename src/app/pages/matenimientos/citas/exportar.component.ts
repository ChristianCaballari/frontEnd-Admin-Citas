import { ActivatedRoute } from '@angular/router';
import { Cita } from '../../../models/Cita';
import { UsuarioService } from '../../../services/usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styles: [],
})
export class ExportarComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  public citas: Cita[] = [];
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarCitasPorUsuario(id)
    );
  }

  cargarCitasPorUsuario(id: number) {
    this.cargando = true;
    this.usuarioService.cargarCitasPorUsuario(id).subscribe(({ citas }) => {
      console.log(citas);
      this.citas = citas;
      this.cargando = false;
    });
  }

  exportPDF() {
    let pdf = new jsPDF('p', 'pt', 'a2', true);
    // let pdf = new jsPDF();
    pdf.text('Historial de Citas', 9, 9);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Historial Citas.pdf');
      },
    });
  }
 fileName = "ExelSheet.xlsx";

  exportExcel() {
    //Pasar el id de la tabla
    let data = document.getElementById('table-data');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    //Generar el workbook y el worksheet,
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
   // Guardar el archivo
   XLSX.writeFile(wb,this.fileName);
  }
}
