import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabelasService } from '../../services/tabelas.service';
import { AnexoIIIItem } from '../../models/anexo-iii-item.model';
import { AnexoVItem } from '../../models/anexo-v-item.model';
import { INSSItem } from '../../models/inss-item.model';
import { IRItem } from '../../models/ir-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNgxMask } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgxMaskDirective } from 'ngx-mask';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';
import { throwError, forkJoin, of, empty } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-atualiza-tabelas',
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
    NgxCurrencyDirective,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './atualiza-tabelas.component.html',
  styleUrl: './atualiza-tabelas.component.scss'
})

export class AtualizaTabelasComponent implements OnInit {
  isNewEmpresa = false;
  celular!: string;
  email!: string;
  anexoIII: AnexoIIIItem[] = [];
  anexoV: AnexoVItem[] = [];
  tabelaINSS: INSSItem[] = [];
  tabelaIR: IRItem[] = [];
  carregando = false;
  erro?: string;
  showAnexoIII = true;
  showAnexoV    = true;
  showINSS      = true;
  showIR        = true;

  empresa?: {
    nome: string;
    celular: string;
    email: string;
    irDependente: number;
  };

  constructor(
    private route: ActivatedRoute,
    private tabelasService: TabelasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.pipe(
      tap(params => {
        this.celular = params['celular'];
        this.email   = params['email'];
      }),
      switchMap(() => this.buscarEmpresa())
    ).subscribe(() => this.buscarTabelas());
  }
  
  buscarEmpresa() {
    return this.tabelasService.getEmpresaPorContato(this.celular.replace(/\D+/g, ''), this.email).pipe(
      tap(emp => {
        if (emp) {
          this.empresa = emp;
          this.isNewEmpresa = emp.celular === '(62)99213-7872';
          if (this.isNewEmpresa) {
            const irDep = this.empresa?.irDependente ?? 0;
            this.empresa = { 
              nome: '', 
              celular: this.celular, 
              email: this.email, 
              irDependente: irDep 
            };
          }
        } else {
          this.empresa = { nome: '', celular: this.celular, email: this.email, irDependente: 0 };
          this.isNewEmpresa = true;
        }
      }),
      catchError(err => {
        if (err.status === 404) {
          this.empresa = { nome: '', celular: this.celular, email: this.email, irDependente: 0 };
          this.isNewEmpresa = true;
          return of(this.empresa);
        }
        throw err;
      })
    );
  }

  buscarTabelas() {
    this.carregando = true;

    forkJoin({
      anexoIII: this.tabelasService.getAnexoIII(this.celular, this.email),
      anexoV:   this.tabelasService.getAnexoV(this.celular, this.email),
      inss:     this.tabelasService.getTabelaINSS(this.celular, this.email),
      ir:       this.tabelasService.getTabelaIR(this.celular, this.email),
    }).subscribe({
      next: res => {
        this.anexoIII = res.anexoIII;
        this.anexoV   = res.anexoV;
        this.tabelaINSS = res.inss;
        this.tabelaIR   = res.ir;
        this.carregando = false;
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erro ao buscar dados.', 'Fechar', { panelClass: ['snackbar-error'] });
        this.carregando = false;
      }
    });
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


  salvarTudo() {
    if (this.isNewEmpresa && this.empresa) {

      if (!this.validarEmpresa()) return;

      this.tabelasService.criarEmpresa({
        nome: this.empresa.nome.trim(),
        celular: this.empresa.celular.trim(),
        email: this.empresa.email.trim(),
        irDependente: this.empresa.irDependente
      }).pipe(
        tap(() => {
          this.isNewEmpresa = false;
          this.snackBar.open('Empresa criada com sucesso!', 'Fechar', { panelClass: ['snackbar-success'] });
        }),
        switchMap(() => this._salvarTabelas())
      ).subscribe({
        error: err => {
          if (err.status === 400 && err.error) {
              this.exibirErrosApi(err.error);
            } else {
              this.snackBar.open('Erro ao criar empresa.', 'Fechar', { panelClass: ['snackbar-error'] });
            }       
          }
      });

    } else {
      this._salvarTabelas().subscribe();
    }
  }
  
  validarEmpresa(): boolean {
    if (!this.empresa?.nome?.trim()) {
      this.snackBar.open('O nome da empresa é obrigatório.', 'Fechar', { panelClass: ['snackbar-error'] });
      return false;
    }
    if (!this.empresa?.celular?.trim()) {
      this.snackBar.open('O celular da empresa é obrigatório.', 'Fechar', { panelClass: ['snackbar-error'] });
      return false;
    }
    if (!this.empresa?.email?.trim()) {
      this.snackBar.open('O e-mail da empresa é obrigatório.', 'Fechar', { panelClass: ['snackbar-error'] });
      return false;
    }
    return true;
  }


  private _salvarTabelas() {
    const params = new HttpParams()
      .set('celular', this.empresa!.celular.replace(/\D+/g,''))
      .set('email', this.empresa!.email);
    return forkJoin({
      a3: this.tabelasService.updateAnexoIII(this.anexoIII, params),
      a5: this.tabelasService.updateAnexoV(this.anexoV,     params),
      inss: this.tabelasService.updateTabelaINSS(this.tabelaINSS, params),
      ir: this.tabelasService.updateTabelaIR(this.tabelaIR,   params),
    }).pipe(
      tap(() => this.snackBar.open('Tabelas atualizadas com sucesso!','Fechar',{duration:3000})),
      catchError(err => {
        console.error(err);
        this.snackBar.open('Erro ao salvar tabelas.','Fechar',{duration:4000});
        return of(null);
      })
    );
  }

  atualizarIrDependente() {
    if (!this.empresa) return;

    const celularLimpo = this.empresa.celular.replace(/\D+/g, '');

    this.tabelasService.atualizarIrDependente(celularLimpo, this.empresa.email, this.empresa.irDependente)
      .subscribe({
        next: () => {
          this.snackBar.open('IR por dependente atualizado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (err) => {
          console.error('Erro ao atualizar IR Dependente:', err);
          this.snackBar.open('Erro ao atualizar IR por dependente.', 'Fechar', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      });
  }



}