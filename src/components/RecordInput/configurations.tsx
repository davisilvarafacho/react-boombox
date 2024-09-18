type ModuleConfig = {
  label: string;
  header: string;
  endpoint: ApiEndpoint;
  apiSearchKey: string;
  defaultFilters: {};
  colunas: {};
};

export function getConfiguracao(modulo: Module): ModuleConfig {}
