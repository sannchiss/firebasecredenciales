import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //Modulo paginación tablas

import { ReactiveFormsModule } from '@angular/forms';

//Agregar el FireModule para gestionar BD
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { ExecutivesComponent } from './components/executives/executives.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ExecutivesComponent,
    HomeComponent
  ],
  //Inyeccion de Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
