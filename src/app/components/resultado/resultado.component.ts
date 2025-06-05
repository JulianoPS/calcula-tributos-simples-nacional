import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CalculoResponseDto, FuncionarioResponseDto, SocioResponseDto } from '../../models/calculo-response.dto';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule,
  MatCardModule],
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent {
  @Input() resultado!: CalculoResponseDto;
  get deveAbrirSocios(): boolean {
      if (!this.resultado) return false;
      return (
        this.resultado.faturamentoMensal === 0 &&
        Array.isArray(this.resultado.socios) &&
        this.resultado.socios.some((s: SocioResponseDto) => s.valorProLabore > 0)
      );
    }
  get deveAbrirFuncionarios(): boolean {
    if (!this.resultado) return false;
    return (
      this.resultado.faturamentoMensal === 0 &&
      Array.isArray(this.resultado.funcionarios) &&
      this.resultado.funcionarios.some((f: FuncionarioResponseDto) => f.valorSalario > 0)
    );
  }
}
