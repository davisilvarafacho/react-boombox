import { useApi } from './useApi';


export function useBackend() {
  const { sendGet, sendPost, sendPatch, sendDelete } = useApi();

  async function listarRegistros() {
    const response = await sendGet();
  }

  async function obterRegistro() {
    const response = await sendGet();
  }

  async function obterRegistroPorFiltros() {
    const response = await sendGet();
  }

  async function criarRegistro<T>(dados: T) {
    const response = await sendPost();
  }

  async function atualizarRegistro<T>(dados: T) {
    const response = await sendPatch();
  }

  async function destruirRegistro(id: number | string) {
    const response = await sendDelete();
  }

  return {
    listarRegistros,
    obterRegistro,
    obterRegistroPorFiltros,
    criarRegistro,
    atualizarRegistro,
    destruirRegistro,
  };
}
