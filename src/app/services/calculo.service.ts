import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalculoRequestDto } from '../models/calculo-request.dto';
import { CalculoResponseDto } from '../models/calculo-response.dto';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  private get calculoUrl() { return `${this.apiBase}/Calculos/simples-nacional`; }
  private get atividadesUrl() { return `${this.apiBase}/Atividades`; }

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBase: string
  ) { }

  calcularImposto(request: CalculoRequestDto): Observable<CalculoResponseDto> {
    return this.http.post<CalculoResponseDto>(`${this.calculoUrl}`, request);
  }

  getAtividades(): Observable<string[]> {
    return this.http.get<string[]>(this.atividadesUrl);
  }
  
}
