type FitlerConfig = {};

type DataGridConfig = {
  titulo: string;
  colunas: string;
  endpoint: string;
  filtersConfig?: FitlerConfig[];
};

const configuracoes = {};

export function getConfiguracao(modulo: Module): DataGridConfig {
  return configuracoes[modulo];
}
