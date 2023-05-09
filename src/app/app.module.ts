import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruckDashboardComponent } from './truck-dashboard/truck-dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TruckData } from 'src/service/truckData';
import { HttpClientModule } from '@angular/common/http';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TruckDashboardComponent, TruckCreateComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(TruckData),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
