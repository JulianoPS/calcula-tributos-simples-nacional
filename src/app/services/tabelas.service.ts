import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AnexoIIIItem } from '../models/anexo-iii-item.model';
import { AnexoVItem } from '../models/anexo-v-item.model';
import { INSSItem } from '../models/inss-item.model';
import { IRItem } from '../models/ir-item.model';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class TabelasService {

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private API_BASE: string
  ) {}

  // 🔸 Utilitário para limpar celular
  private limparCelular(celular: string): string {
    return celular?.replace(/\D+/g, '') ?? '';
  }

  // 🔸 Utilitário para formatar celular (99)99999-9999
  private formatarCelular(celular: string): string {
    const cel = this.limparCelular(celular);
    if (cel.length === 11) {
      return `(${cel.slice(0, 2)})${cel.slice(2, 7)}-${cel.slice(7)}`;
    }
    return celular; // retorna como está se não for 11 dígitos
  }

  private criarParams(celular: string, email: string): HttpParams {
    let params = new HttpParams();

    const celLimpo = this.limparCelular(celular);
    const emailLimpo = email?.trim();

    if (celLimpo) {
      params = params.set('celular', celLimpo);
    }
    if (emailLimpo) {
      params = params.set('email', emailLimpo);
    }
    return params;
  }

  // 🔹 GET Empresa com formatação no retorno
  getEmpresaPorContato(celular: string, email: string) {
    const params = this.criarParams(celular, email);

    return this.http.get<any>(`${this.API_BASE}/Empresas/por-contato`, { params }).pipe(
      map(empresa => {
        if (empresa && empresa.celular) {
          empresa.celular = this.formatarCelular(empresa.celular);
        }
        return empresa;
      })
    );
  }

  // 🔹 CRUD dos anexos e tabelas
  getAnexoIII(celular: string, email: string): Observable<AnexoIIIItem[]> {
    return this.http.get<AnexoIIIItem[]>(`${this.API_BASE}/AnexoIII`, {
      params: this.criarParams(celular, email)
    });
  }

  getAnexoV(celular: string, email: string): Observable<AnexoVItem[]> {
    return this.http.get<AnexoVItem[]>(`${this.API_BASE}/AnexoV`, {
      params: this.criarParams(celular, email)
    });
  }

  getTabelaINSS(celular: string, email: string): Observable<INSSItem[]> {
    return this.http.get<INSSItem[]>(`${this.API_BASE}/TabelaINSS`, {
      params: this.criarParams(celular, email)
    });
  }

  getTabelaIR(celular: string, email: string): Observable<IRItem[]> {
    return this.http.get<IRItem[]>(`${this.API_BASE}/TabelaIR`, {
      params: this.criarParams(celular, email)
    });
  }

  atualizarIrDependente(celular: string, email: string, irDependente: number) {
    const params = this.criarParams(celular, email);
    return this.http.put<void>(
      `${this.API_BASE}/Empresas/ir-dependente`,
      { irDependente },
      { params }
    );
  }

  // 🔹 Atualizações
  updateAnexoIII(items: AnexoIIIItem[], params: HttpParams): Observable<any> {
    return this.http.put(`${this.API_BASE}/AnexoIII`, items, { params });
  }

  updateAnexoV(items: AnexoVItem[], params: HttpParams): Observable<any> {
    return this.http.put(`${this.API_BASE}/AnexoV`, items, { params });
  }

  updateTabelaINSS(items: INSSItem[], params: HttpParams): Observable<any> {
    return this.http.put(`${this.API_BASE}/TabelaINSS`, items, { params });
  }

  updateTabelaIR(items: IRItem[], params: HttpParams): Observable<any> {
    return this.http.put(`${this.API_BASE}/TabelaIR`, items, { params });
  }

  criarEmpresa(dto: { nome: string, celular: string, email: string, irDependente: number }) {
    const dtoCorrigido = {
      ...dto,
      celular: this.limparCelular(dto.celular),
      email: dto.email?.trim()
    };
    return this.http.post(`${this.API_BASE}/Empresas`, dtoCorrigido);
  }
}
