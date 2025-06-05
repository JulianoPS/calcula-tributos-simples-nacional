import { Routes } from '@angular/router';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { AtualizaTabelasComponent } from './pages/atualiza-tabelas/atualiza-tabelas.component';

export const routes: Routes = [
  { path: '', component: CalculadoraComponent },
  {
    path: 'atualiza-tabelas',
    component: AtualizaTabelasComponent,
  },
  { path: '**', redirectTo: '' }
];
