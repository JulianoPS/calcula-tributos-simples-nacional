import { DespesasFixasDto } from './despesas-fixas.dto';

export interface Socios {
  nome: string;
  valorProLabore: number;
  numeroDependentes: number;
}

export interface Funcionario {
  nome: string;
  valorSalario: number;
  numeroDependentes: number;
}

export interface CalculoRequestDto {
  faturamentoMensal: number;
  faturamentoDosUltimos12Meses: number;
  atividade?: string;
  celular?: string;
  email?: string;
  despesasFixas: DespesasFixasDto;
  socios: Socios[];
  funcionarios: Funcionario[];
}
