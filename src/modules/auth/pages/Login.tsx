import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Title,
  Paper,
  Text,
  Anchor,
  Group,
} from '@mantine/core';
import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import { IconExclamationMark } from '@tabler/icons-react';

import { useAuth } from 'hooks/useAuth';
import { invalidacoes } from 'constants/mensagens';

type FormValues = {
  email: string;
  senha: string;
};

export function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      senha: '',
    },
    validate: {
      email: isEmail(invalidacoes.email),
      senha: isNotEmpty(invalidacoes.campoObrigatorio),
    },
  });

  async function handleLogin(values: FormValues) {
    setLoading(true);
    login(values.email, values.senha).finally(() => setLoading(false));
  }

  return (
    <Container size={420} h="100vh">
      <Stack h="100%" justify="center">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Title c="blue" ta="center" className="brand-title">
            React Boombox
          </Title>

          <Paper withBorder shadow="md" p={30} mt={20} radius="md">
            <TextInput
              label="Email"
              placeholder="exemplo@gmail.com"
              size="md"
              maxLength={40}
              required
              rightSection={form.errors.email && <IconExclamationMark />}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              key={form.key('senha')}
              label="Senha"
              placeholder="Sua senha"
              mt="md"
              maxLength={50}
              size="md"
              rightSection={form.errors.senha && <IconExclamationMark />}
              required
              {...form.getInputProps('senha')}
            />

            <Group justify="end" mt="lg">
              <Anchor
                component="button"
                type="button"
                size="sm"
                onClick={() => navigate('esqueci-minha-senha/')}>
                Esqueceu a senha?
              </Anchor>
            </Group>

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Entrar
            </Button>
          </Paper>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Ainda não tem sua conta?{' '}
            <Anchor
              type="button"
              size="sm"
              component="button"
              onClick={() => navigate('cadastro/')}>
              Cadastre-se
            </Anchor>
          </Text>
        </form>
      </Stack>
    </Container>
  );
}
