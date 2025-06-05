import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'; 
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-socios-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    NgxCurrencyDirective
  ],
  templateUrl: './socios-form.component.html',
  styleUrls: ['./socios-form.component.scss'],
})
export class SociosFormComponent implements OnInit {
  @Input() socios: any[] = [];
  @Output() sociosChange = new EventEmitter<any[]>();

  ngOnInit(): void {
    if (this.socios.length === 0) {
      this.adicionarSocio();
    }
  }

  adicionarSocio() {
    this.socios.push({ nome: '', valorProLabore: 0, numeroDependentes: 0 });
    this.sociosChange.emit(this.socios);
  }

  removerSocio(index: number) {
    this.socios.splice(index, 1);
    this.sociosChange.emit(this.socios);
    if (this.socios.length === 0) {
      this.adicionarSocio();
    }
  }
  

  atualizar() {
    this.sociosChange.emit(this.socios);
  }
}
