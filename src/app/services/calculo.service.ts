import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalculoRequestDto } from '../models/calculo-request.dto';
import { CalculoResponseDto } from '../models/calculo-response.dto';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  
  private readonly API_URL = 'https://localhost:7099/api/Calculos/simples-nacional'; // ✅ Apntar para API
  private readonly API_ATIVIDADES = 'https://localhost:7099/api/Atividades';
  
  constructor(private http: HttpClient) { }

  calcularImposto(request: CalculoRequestDto): Observable<CalculoResponseDto> {
    return this.http.post<CalculoResponseDto>(`${this.API_URL}`, request);
  }

  getAtividades(): Observable<string[]> {
    return this.http.get<string[]>(this.API_ATIVIDADES);
  }
  
}
