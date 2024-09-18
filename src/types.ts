/* eslint-disable @typescript-eslint/no-unused-vars */

type ListApiResponse<T> = {
  total: number;
  proxima: null | string;
  anterior: null | string;
  resultados: T[];
};

type Module = '';

type ApiEndpoint = '';

interface DatabaseRecord {
  id: number;
  ativo: string;
  data_criacao: string;
  hora_criacao: string;
  data_ultima_alteracao: string;
  hora_ultima_alteracao: string;
  owner: number;
  filial: number;
  classe_valor: number;
  plano_contas: number;
  centro_custo: number;
}
