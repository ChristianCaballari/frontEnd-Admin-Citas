import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './matenimientos/usuarios/usuarios.component';
import { CitasComponent } from './matenimientos/citas/citas.component';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';
import { CitaComponent } from './matenimientos/citas/cita.component';
import { ExportarComponent } from './matenimientos/citas/exportar.component';



@NgModule({
  declarations: [
    PagesComponent,
    UsuariosComponent,
    CitasComponent,
    PerfilComponent,
    CitaComponent,
    ExportarComponent
  ],
  exports:[
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
   // ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
