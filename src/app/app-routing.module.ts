import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../app/components/home/home.component";
import { ExecutivesComponent } from "./components/executives/executives.component";

const routes: Routes = [
  {
  path:'',
  component: HomeComponent
  },
  {
  path:'executives',
  component:ExecutivesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
