export interface DespesasFixasDto {
  contador: number;
  aluguelSala: number;
  internet: number;
  aguaEenergia: number;
}

export interface DespesasFixasAnualDto {
  contadorAnual: number;
  aluguelSalaAnual: number;
  internetAnual: number;
  aguaEenergiaAnual: number;
}

export interface SocioResponseDto {
  nome: string;
  valorProLabore: number;
  valorProLaboreAnual: number;
  numeroDependentes: number;
  valorINSS: number;
  valorIR: number;
  valorLiquido: number;
}

export interface FuncionarioResponseDto {
  nome: string;
  valorSalario: number;
  valorSalarioAnual: number;
  numeroDependentes: number;
  valorINSS: number;
  valorIR: number;
  valorLiquido: number;
}

export interface Encargos {
  msg: string;
  cppSociosMensal: number;
  cppFuncionariosMensal: number;
  fgtsMensal: number;
  totalEncargosMensal: number;
}

export interface EncargosMEI {
  msg: string;
  das: number;
  irpf: number;
  total: number;
}

export interface CalculoResponseDto {
  faturamentoMensal: number;
  faturamentoAnual: number;
  folhaSalarios: number;
  fatorR: number;
  anexo: string;               // "III" ou "V"
  aliquotaNominal: number;
  aliquotaEfetiva: number;
  das: number;
  valorLiquidoMensal: number;
  despesasFixas: DespesasFixasDto;
  despesasFixasAnual: DespesasFixasAnualDto;
  socios: SocioResponseDto[];
  funcionarios: FuncionarioResponseDto[];
  encargos: Encargos;
  encargosMEI: EncargosMEI;
}
