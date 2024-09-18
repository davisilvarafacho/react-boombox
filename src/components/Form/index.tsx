/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  LoadingOverlay,
  Title,
  Space,
  Center,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { IconArrowLeft } from '@tabler/icons-react';

import { useApi } from 'hooks/useApi';

type BaseFields = {
  id: number;
};

type Props<FormValues, Record> = {
  titulo: string;
  endpoint: ApiEndpoint;
  form: UseFormReturnType<FormValues>;
  getDados: (values: FormValues) => Promise<Record>;
  loadInitialData: (values: Record) => Promise<FormValues>;
  validacoes: (values: FormValues) => Promise<any>;
  callbackSalvar?: (values: Record) => void;
} & PropsWithChildren;

export function Form<FormValues extends BaseFields, Record extends BaseFields>(
  props: Props<FormValues, Record>
) {
  const { children, titulo, form, endpoint, getDados, loadInitialData, validacoes } = props;

  const [salvando, setSalvando] = useState(false);

  const { id } = useParams();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const urlGrid = useMemo(() => {
    const splittedPath = pathname.split('/');
    splittedPath.shift();
    splittedPath.pop();
    splittedPath.pop();
    return `/${splittedPath.join('/')}/`;
  }, []);

  const { sendGetRetrieve, sendPost } = useApi(endpoint);

  function getDadosRegistro() {
    sendGetRetrieve<Record>(+id!).then(async (dados) => {
      const dadosFormatados = await loadInitialData(dados);
      dadosFormatados.id = dados.id;
      form.initialize(dadosFormatados);
    });
  }

  async function handleSalvar(values: FormValues) {
    await validacoes(values);

    if (Object.keys(form.errors).length !== 0) return;

    setSalvando(true);

    const dadosApi = await getDados(values);

    sendPost(dadosApi)
      .then(() => {
        showNotification({
          title: 'Registro Salvo',
          message: `Registro ${id ? 'salvo' : 'cadastrado'} com sucesso`,
          color: 'primary',
          autoClose: 4000,
          withCloseButton: true,
        });
        navigate(urlGrid);
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      })
      .catch(() => {
        showNotification({
          title: 'Ocorreu um erro',
          message: `Não foi possível ${id ? 'salvo' : 'cadastrar'}`,
          color: 'red',
          autoClose: 4000,
          withCloseButton: true,
        });
      })
      .finally(() => setSalvando(false));
  }

  useEffect(() => {
    if (id) getDadosRegistro();
  }, []);

  return (
    <Container size="" pos="relative">
      <LoadingOverlay visible={salvando} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

      <form onSubmit={form.onSubmit(handleSalvar)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4, lg: 6 }} order={{ base: 1, md: 2 }}>
            <Center>
              <Title
                style={{
                  borderBottom: '10px solid #7C56DE',
                  borderRadius: '8px',
                }}
                ta="center">
                {titulo}
              </Title>
            </Center>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 4, lg: 3 }} order={{ base: 2, md: 1 }}>
            <Flex justify="start">
              <Button
                leftSection={<IconArrowLeft />}
                onClick={() => navigate(urlGrid)}
                variant="transparent">
                Voltar
              </Button>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 4, lg: 3 }} order={{ base: 3, md: 3 }}>
            <Flex justify="end">
              <Button type="submit" variant="subtle" loading={salvando}>
                Salvar
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>

        <Space my="lg" />

        <Divider mb="lg" />

        {children}
      </form>
    </Container>
  );
}
