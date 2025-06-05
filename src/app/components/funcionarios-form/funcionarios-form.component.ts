import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Funcionario } from '../../models/calculo-request.dto';

@Component({
  selector: 'app-funcionarios-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgxCurrencyDirective
  ],
  templateUrl: './funcionarios-form.component.html',
  styleUrls: ['./funcionarios-form.component.scss']
})
export class FuncionariosFormComponent implements OnInit {
  @Input() funcionarios: Funcionario[] = [];
  @Output() funcionariosChange = new EventEmitter<Funcionario[]>();

  ngOnInit(): void {
    if (this.funcionarios.length === 0) {
      this.adicionarFuncionario();
    }
  }

  adicionarFuncionario() {
    const novoFuncionario: Funcionario = {
      nome: '',
      valorSalario: 0,
      numeroDependentes: 0
    };
    this.funcionarios.push(novoFuncionario);
    this.funcionariosChange.emit(this.funcionarios);
  }

  removerFuncionario(index: number) {
    this.funcionarios.splice(index, 1);
    this.funcionariosChange.emit(this.funcionarios);

    if (this.funcionarios.length === 0) {
      this.adicionarFuncionario();
    }
  }

  atualizar() {
    this.funcionariosChange.emit(this.funcionarios);
  }
}
