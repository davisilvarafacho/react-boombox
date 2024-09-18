import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

import { decodeJwt } from 'utils/jwt';
import { auth } from 'services/auth';
import { sessionKeys } from 'constants/sessionKeys';

type LoginResponse = {
  access: string;
};

export function useAuth() {
  const navigate = useNavigate();

  async function login(email: string, password: string, redirect = true) {
    const response = await auth
      .post<LoginResponse>('login/', { email, password })
      .then((res) => {
        localStorage.setItem(sessionKeys.jwt, res.data.access);

        if (redirect) {
          const homePath = '/app/';
          navigate(homePath);
        }

        const { user_full_name } = decodeJwt(res.data.access);
        showNotification({
          title: `Bem-vindo de volta ${user_full_name}!`,
          message: 'Que bom que você voltou, sentimos sua falta!',
          color: 'blue',
          autoClose: 4000,
          withCloseButton: true,
        });

        return res.data.access;
      })
      .catch((err) => {
        const NETWORK_ERROR = 'AxiosError: Network Error';
        const ehErroConexao = String(err) === NETWORK_ERROR;

        import.meta.env.DEV && !ehErroConexao && console.error(err.response.data);

        let message: string;
        if (ehErroConexao) {
          message = 'Neste momento nossos servidores estão fora do ar. Tente novamente mais tarde';
        } else {
          message = err.response.data.mensagem;
        }

        showNotification({
          title: 'Erro',
          message,
          color: 'red',
          autoClose: 4000,
          withCloseButton: true,
        });
        return null;
      });

    return response;
  }

  async function verfifcaCadastroEmail(email: string) {
    const emailJaCadastrado = await auth
      .get(`email_disponivel/?email=${email}`)
      .then(() => false)
      .catch(() => true);
    return emailJaCadastrado;
  }

  async function cadastro(
    nome: string,
    sobrenome: string,
    email: string,
    password: string,
    celular: string,
    assinatura: string
  ) {
    const response = await auth
      .post('cadastro/', { nome, sobrenome, email, password, celular, assinatura })
      .then(() => {
        login(email, password);
      })
      .catch(() => null);

    return response;
  }

  async function enviarEmailRedefinicaoSenha(email: string) {
    const response = await auth
      .post('enviar_email_redefinicao_senha/', { usuario: email })
      .then(() => {
        showNotification({
          title: 'Solicitação de Redefinição de Senha Enviada',
          message:
            'Um email foi enviado para você redefinir sua senha. O link expira em 10 minutos.',
          color: 'blue',
          autoClose: 4000,
          withCloseButton: true,
        });
      })
      .catch((err) => {
        const NETWORK_ERROR = 'AxiosError: Network Error';
        const ehErroConexao = String(err) === NETWORK_ERROR;

        import.meta.env.DEV && !ehErroConexao && console.error(err.response.data);

        let message: string;
        if (ehErroConexao) {
          message = 'Neste momento nossos servidores estão fora do ar. Tente novamente mais tarde';
        } else {
          message = err.response.data.mensagem;
        }

        showNotification({
          title: 'Erro',
          message,
          color: 'red',
          autoClose: 4000,
          withCloseButton: true,
        });
      });

    return response;
  }

  async function redefinirSenha(email: string, novaSenha: string, jwt: string) {
    const response = await auth
      .post(
        'redefinir_senha/',
        {
          usuario: email,
          nova_senha: novaSenha,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(() => {
        showNotification({
          title: 'Senha Redefinida com Sucesso',
          message: 'Sua senha foi redefinida com sucesso!',
          color: 'blue',
          autoClose: 4000,
          withCloseButton: true,
        });

        login(email, novaSenha);
      })
      .catch((err) => {
        const NETWORK_ERROR = 'AxiosError: Network Error';
        const ehErroConexao = String(err) === NETWORK_ERROR;

        import.meta.env.DEV && !ehErroConexao && console.error(err.response.data);

        let message: string;
        if (ehErroConexao) {
          message = 'Neste momento nossos servidores estão fora do ar. Tente novamente mais tarde';
        } else {
          message = err.response.data.mensagem;
        }

        showNotification({
          title: 'Erro',
          message,
          color: 'red',
          autoClose: 4000,
          withCloseButton: true,
        });
      });

    return response;
  }

  return { login, verfifcaCadastroEmail, cadastro, enviarEmailRedefinicaoSenha, redefinirSenha };
}
