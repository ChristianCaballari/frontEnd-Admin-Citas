import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './matenimientos/usuarios/usuarios.component';
import { CitasComponent } from './matenimientos/citas/citas.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { CitaComponent } from './matenimientos/citas/cita.component';
import { AdminGuard } from '../guards/admin.guard';
import { ExportarComponent } from './matenimientos/citas/exportar.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de Usuario' },
      },

      {
        path: 'citas/nuevo',
        component: CitaComponent,
        data: { titulo: 'Creación de Citas' },
      },

      {
        path: 'citas/exportar/:id',
        component: ExportarComponent,
        data: { titulo: 'Exportar de Datos' },
      },

      {
        path: 'citas',
        component: CitasComponent,
        data: { titulo: 'Mantenimiento de Citas' },
      },

      //Rutas admin
      {
        path: 'usuarios',
        canActivate : [AdminGuard], component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
