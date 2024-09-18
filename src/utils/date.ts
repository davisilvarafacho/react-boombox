export function dateConversor(date: string, pt_br = true) {
  return pt_br
    ? new Date(date).toLocaleDateString('pt-br')
    : new Date(date).toLocaleDateString('en-US');
}

export function today(ptBr = true) {
  const date = new Date().toLocaleDateString('pt-br');
  return ptBr ? date : date.split('/').reverse().join('-');
}

export function now() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');

  return `${horas}:${minutos}:${segundos}`;
}

export class DateUtils {}

export function calcularDiferencaMinutosDeAgora(hora: string): string {
  if (!hora) return 'Agora';

  const agora = new Date();
  const [horas, minutos] = hora.substring(0, 6).split(':');
  const criacao = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate(),
    parseInt(horas, 10),
    parseInt(minutos, 10)
  );

  const diferencaMilisegundos = agora - criacao;
  const diferencaMinutos = Math.round(((diferencaMilisegundos % 86400000) % 3600000) / 60000);

  if (diferencaMinutos === 0) {
    return 'Agora';
  }

  if (diferencaMinutos === 1) {
    return `${diferencaMinutos} minuto`;
  }

  return `${diferencaMinutos} minutos`;
}
