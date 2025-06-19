import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Socios } from '../../models/calculo-request.dto';
import { Funcionario } from '../../models/calculo-request.dto';
import { CalculoResponseDto } from '../../models/calculo-response.dto';
import { CalculoService } from '../../services/calculo.service';
import { SociosFormComponent } from '../../components/socios-form/socios-form.component';
import { FuncionariosFormComponent } from '../../components/funcionarios-form/funcionarios-form.component';
import { ResultadoComponent } from '../../components/resultado/resultado.component';
import { CalculoRequestDto } from '../../models/calculo-request.dto';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNgxMask } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgxMaskDirective } from 'ngx-mask';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';        
import { MatOptionModule } from '@angular/material/core';         
import { AdBannerWrapperComponent } from '../../components/ad-banner-wrapper/ad-banner-wrapper.component';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SociosFormComponent,
    FuncionariosFormComponent,
    ResultadoComponent,
    MatExpansionModule,
    NgxCurrencyDirective,
    NgxMaskDirective,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,

    SociosFormComponent,
    FuncionariosFormComponent,
    ResultadoComponent, 
    AdBannerWrapperComponent
  ],
  providers: [provideNgxMask()],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
  faturamentoMensal: number = 0;
  celular: string = '';
  email:   string = '';
  atividadeSelecionada?: string;    
  socios: Socios[] = [];
  listaAtividades: string[] = []; 
  funcionarios: Funcionario[] = [];
  despesasFixas = {
    contador: 0,
    aluguelSala: 0,
    internet: 0,
    aguaEenergia: 0
  };

  resultado?: CalculoResponseDto;
  erro?: string;
  carregando       = false;
  showDespesas     = true;
  showSocios       = true;
  showFuncionarios = true;
  public showAd = !('adsbygoogle' in window === false) || true;

  constructor(
    private calculoService: CalculoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // 1) Busca lista de atividades assim que o componente carrega
    this.calculoService.getAtividades().subscribe({
      next: (atividades) => {
        this.listaAtividades = atividades;
      },
      error: (err) => {
        console.error('Erro ao buscar atividades:', err);
        this.snackBar.open('Falha ao carregar atividades.', 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  private parseCurrency(raw: string | number): number {
    if (raw == null || raw === '') return 0;
    let s = String(raw).trim();

    // 1) Remove qualquer prefixo, letras, espaços, 'R$', etc. 
    s = s.replace(/[^\d.,-]/g, '');

    // 2) Se tiver vírgula e ponto, assumimos formato BR: pontos = milhares, vírgula = decimal
    if (s.includes('.') && s.includes(',')) {
      s = s.replace(/\./g, '');    // tira pontos de milhar
      s = s.replace(',', '.');     // vírgula vira decimal
    }
    // 3) Se só tiver vírgula, usamos ela como decimal
    else if (s.includes(',') && !s.includes('.')) {
      s = s.replace(',', '.');
    }
    // 4) Se só tiver ponto, e não tiver vírgula, deixamos o ponto como decimal
    //    (não removemos, pois já está no padrão JS)
    
    // 5) Agora convertemos
    const num = parseFloat(s);
    return isNaN(num) ? 0 : num;
  }

  /** Recebe o payload de erro da API e exibe todas as mensagens no snackBar */
  private exibirErrosApi(errorResponse: any) {
    // se a API segue o padrão .NET, o objeto de interesse está em errorResponse.errors
    const validationErrors = errorResponse.errors ?? errorResponse;

    const mensagens: string[] = [];

    // percorre cada campo dentro de errors
    Object.entries(validationErrors).forEach(([campo, msgs]) => {
      // msgs pode ser array ou string única
      const lista = Array.isArray(msgs) ? msgs : [msgs as string];
      lista.forEach(msg => mensagens.push(msg));
    });

    // monta uma única string e exibe
    const texto = mensagens.join(' | ');
    this.snackBar.open(texto, 'Fechar', {
      panelClass: ['snackbar-error'],
      duration: 8000
    });
  }

  calcular() {
    this.carregando       = true;
    this.erro             = undefined;
    this.resultado        = undefined;
    this.showDespesas     = false;
    this.showSocios       = false;
    this.showFuncionarios = false;

    if (this.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.erro = 'E‑mail inválido.';
      return;
    }
    if (this.celular && this.celular.replace(/\D/g, '').length < 10) {
      this.erro = 'Celular incompleto.';
      return;
    }

    const emailTratado = this.email?.trim() === '' ? undefined : this.email?.trim();
    const celularTratado = this.celular?.replace(/\D/g, '') || undefined;

    const request: CalculoRequestDto = {
      celular: celularTratado,
      email: emailTratado,
      atividade: this.atividadeSelecionada,
      faturamentoMensal: this.parseCurrency(this.faturamentoMensal as any),
      faturamentoDosUltimos12Meses: this.parseCurrency(this.faturamentoMensal as any),
      despesasFixas: {
        contador: this.parseCurrency(this.despesasFixas.contador as any),
        aluguelSala: this.parseCurrency(this.despesasFixas.aluguelSala as any),
        internet: this.parseCurrency(this.despesasFixas.internet as any),
        aguaEenergia: this.parseCurrency(this.despesasFixas.aguaEenergia as any),
      },
      socios: this.socios.map(s => ({
        ...s,
        valorProLabore: this.parseCurrency(s.valorProLabore as any)
      })),
      funcionarios: this.funcionarios.map(f => ({
        ...f,
        valorSalario: this.parseCurrency(f.valorSalario as any)
      }))
    };

    console.log('Request enviado para API:', request);

    this.calculoService.calcularImposto(request).subscribe({
      next: (res) => {
        console.log('Resposta da API:', res);
        this.resultado = res;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro na API:', err);
        
        this.erro = 'Erro ao calcular. Verifique os dados ou tente novamente.';
        this.exibirErrosApi(err.error)
        this.carregando = false;
        this.showDespesas     = true;
        this.showSocios       = true;
        this.showFuncionarios = true;
        
      }
    });
  }

  limpar() {
    this.resultado        = undefined;
    this.erro             = undefined;
    this.showDespesas     = true;
    this.showSocios       = true;
    this.showFuncionarios = true;
  }
  
  irParaAtualizar() {
  if (!this.celular && !this.email) {
    this.erro = 'Informe celular ou email para atualizar tabelas';
    this.snackBar.open(this.erro, 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-error'], // opcional: classe custom para estilo
        });
    return;
  }
  if (this.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.erro = 'E‑mail inválido.';
      this.snackBar.open(this.erro, 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-error'], // opcional: classe custom para estilo
        });
      return;
    }
    if (this.celular && this.celular.replace(/\D/g, '').length < 10) {
      this.erro = 'Celular incompleto.';
      this.snackBar.open(this.erro, 'Fechar', {
          duration: 4000,
          panelClass: ['snackbar-error'], // opcional: classe custom para estilo
        });
      return;
    }
  this.router.navigate(['/atualiza-tabelas'], {
    queryParams: { celular: this.celular, email: this.email }
  });
}
}
