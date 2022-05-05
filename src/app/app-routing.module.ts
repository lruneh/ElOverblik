import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverblikMainComponent } from './overblik/overblik-main/overblik-main.component';

const routes: Routes = [
  { path: 'overblik', component: OverblikMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
