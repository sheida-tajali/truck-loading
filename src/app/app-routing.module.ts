import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { TruckDashboardComponent } from './truck-dashboard/truck-dashboard.component';

const routes: Routes = [
  { path: 'trucks', component: TruckDashboardComponent },
  { path: '', redirectTo: '/trucks', pathMatch: 'full' },
  { path: 'trucks/add', component: TruckCreateComponent },
  { path: 'trucks/edit/:id', component: TruckCreateComponent },
  { path: '*', redirectTo: '/trucks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
