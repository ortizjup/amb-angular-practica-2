import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AltaActualizacionProductosComponent } from './pages/alta-actualizacion-productos/alta-actualizacion-productos.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'alta', component: AltaActualizacionProductosComponent},
  {path: 'actualizar/:id', component: AltaActualizacionProductosComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
