import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChessClockComponent } from '../app/chess-clock/chess-clock.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: 'chess-clock',
    component: ChessClockComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
