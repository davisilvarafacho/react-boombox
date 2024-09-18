import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Button, Container, Flex, Stack, TextInput, Title } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconExclamationMark, IconArrowLeft } from '@tabler/icons-react';

import { invalidacoes } from 'constants/mensagens';
import { useAuth } from 'hooks/useAuth';

type Values = {
  email: string;
};

export function EsqueciMinhaSenha() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail(invalidacoes.email),
    },
  });

  const { enviarEmailRedefinicaoSenha } = useAuth();

  function handleEsqueciSenha(values: Values) {
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

        <form onSubmit={form.onSubmit(handleEsqueciSenha)}>
          <Stack gap="md">
            <TextInput
              size="md"
              mt="md"
              label="Email"
              withAsterisk
              rightSection={form.errors.email && <IconExclamationMark />}
              {...form.getInputProps('email')}
            />

            <Button type="submit" variant="filled" mt="md" loading={loading} fullWidth>
              Enviar email
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
