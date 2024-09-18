export const regexs = {
  obrigatorio: /./,
  cep: /^\d{5}\-\d{3}$/,
  data: /\d{2}\/\d{2}\/\d{4}/,
  cpf: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
  celular: /\(\d{2}\)\ \d{5}\-\d{4}/,
  telefone: /^\(\d{2}\)\s\d{4}\-\d{4}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
