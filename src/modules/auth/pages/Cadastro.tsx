import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Container,
  Flex,
  Stack,
  TextInput,
  InputBase,
  PasswordInput,
  Title,
} from '@mantine/core';
import { isNotEmpty, isEmail, useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { IconExclamationMark, IconArrowLeft } from '@tabler/icons-react';
import { IMaskInput } from 'react-imask';

import { invalidacoes } from 'constants/mensagens';
import { useAuth } from 'hooks/useAuth';

type Values = {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  senha: string;
};

export function Cadastro() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      cpf: '',
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      senha: '',
    },
    validate: {
      cpf: isNotEmpty(invalidacoes.campoObrigatorio),
      nome: isNotEmpty(invalidacoes.campoObrigatorio),
      sobrenome: isNotEmpty(invalidacoes.campoObrigatorio),
      dataNascimento: isNotEmpty(invalidacoes.campoObrigatorio),
      email: isEmail(invalidacoes.email),
      senha: isNotEmpty(invalidacoes.campoObrigatorio),
    },
  });

  const { enviarEmailRedefinicaoSenha } = useAuth();

  function handleCadastro(values: Values) {
    setLoading(true);
    enviarEmailRedefinicaoSenha(values.email).finally(() => setLoading(false));
  }

  const navigate = useNavigate();

  return (
    <Container size="xs">
      <Stack h="100vh" align="stretch" justify="center" gap="md">
        <Flex direction="column" align="center">
          <Title c="blue" ta="center" className="brand-title">
            React Boombox
          </Title>

          <Anchor component="button" type="button" size="sm" onClick={() => navigate('/')} mt="sm">
            <IconArrowLeft style={{ marginBottom: '-5px' }} size={19} /> Voltar ao login
          </Anchor>
        </Flex>

        <form onSubmit={form.onSubmit(handleCadastro)} autoComplete="off">
          <Stack gap="md">
            <InputBase
              mask="000.000.000-00"
              component={IMaskInput}
              label="CPF"
              withAsterisk
              rightSection={form.errors.cpf && <IconExclamationMark />}
              {...form.getInputProps('cpf')}
            />

            <TextInput
              label="Nome"
              withAsterisk
              maxLength={50}
              rightSection={form.errors.nome && <IconExclamationMark />}
              {...form.getInputProps('nome')}
            />

            <TextInput
              label="Sobrenome"
              withAsterisk
              maxLength={80}
              rightSection={form.errors.sobrenome && <IconExclamationMark />}
              {...form.getInputProps('sobrenome')}
            />

            <DateInput
              label="Data de Nascimento"
              rightSection={form.errors?.dataNascimento && <IconExclamationMark />}
              withAsterisk
              clearable
              {...form.getInputProps('dataNascimento')}
            />

            <TextInput
              label="Email"
              withAsterisk
              rightSection={form.errors.email && <IconExclamationMark />}
              maxLength={50}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Senha"
              withAsterisk
              rightSection={form.errors.senha && <IconExclamationMark />}
              maxLength={30}
              {...form.getInputProps('senha')}
            />

            <Button type="submit" variant="filled" mt="md" loading={loading} fullWidth>
              Finalizar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
