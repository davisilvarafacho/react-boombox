import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActionIcon, Group, Button, Flex, Text, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
  MRT_RowData,
} from 'mantine-react-table';
import { IconPlus, IconTrash, IconEye } from '@tabler/icons-react';

import { useApi } from 'hooks/useApi';
import { obj2query } from 'utils/urls';
import { gridFilter2query, gridOrdering2query } from 'utils/dataGrid';

import { ptBr } from './pt-BR';

type Props<R extends MRT_RowData> = {
  titulo: string;
  colunas: MRT_ColumnDef<R>[];
  endpoint: ApiEndpoint;
  filtersConfig: {};
};

export function DataGrid<R extends MRT_RowData>(props: Props<R>) {
  const { titulo, colunas, endpoint, filtersConfig } = props;

  const [queryKey, setQueryKey] = useState<string[]>([]);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [_, setUrlParams] = useSearchParams(
    new URLSearchParams(
      obj2query({
        page: pagination.pageIndex,
        size: pagination.pageSize,
      })
    )
  );

  const { sendGetList, sendDelete } = useApi(endpoint);

  const { data, isError, isLoading, isRefetching } = useQuery<ListApiResponse<R>>({
    queryKey,
    enabled: !!queryKey.length,
    queryFn: () =>
      sendGetList<R>({
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        search: globalFilter ?? '',
        ...gridFilter2query(columnFilters ?? [], filtersConfig),
        ...gridOrdering2query(sorting ?? []),
      }),
  });

  useEffect(() => {
    const newKey = [
      endpoint,
      obj2query(gridFilter2query(columnFilters ?? [])),
      obj2query(gridOrdering2query(sorting ?? [])),
      `search=${globalFilter ?? ''}`,
      `page=${pagination.pageIndex}${1}`,
      `page_size=${pagination.pageSize}`,
    ];

    const filters = obj2query(gridFilter2query(columnFilters ?? []));

    if (filters !== '') newKey.push(filters);

    setQueryKey(newKey);
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  useEffect(() => {
    const newUrlParams = new URLSearchParams(
      obj2query({
        page: pagination.pageIndex,
        size: pagination.pageSize,
      })
    );

    setUrlParams(newUrlParams);
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useMantineReactTable({
    localization: ptBr,

    data: data?.resultados ?? [],
    rowCount: data?.total ?? 0,
    columns: colunas,

    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,

    enableColumnActions: false,
    enableColumnOrdering: true,
    enableColumnDragging: true,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableRowActions: true,
    // enableColumnResizing: true,

    mantineToolbarAlertBannerProps: isError
      ? { color: 'red', children: 'Ocorreu um erro ao carregar os dados' }
      : undefined,
    mantinePaperProps: { bd: '0', shadow: '0' },
    // mantineProgressProps: { color: 'blue' },
    mantineLoadingOverlayProps: {
      loaderProps: { color: 'blue', type: 'bars' },
    },

    initialState: { showColumnFilters: false, density: 'xs' },
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderRowActions: ({ row: { original: dados } }) => (
      <Flex gap="xs">
        <Tooltip label="Visualizar">
          <ActionIcon variant="transparent" c="blue" onClick={() => navigate(`${dados.id}/`)}>
            <IconEye size={20} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Deletar">
          <ActionIcon
            variant="transparent"
            c="blue"
            onClick={() => {
              modals.openConfirmModal({
                title: 'Excluir Registro',
                children: <Text size="sm">Tem certeza que deseja excluir esse registro?</Text>,
                labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
                onConfirm: () => {
                  sendDelete(dados.id)
                    .then(() => {
                      queryClient.invalidateQueries({ queryKey: [endpoint] });
                      showNotification({
                        title: 'Registro Excluído',
                        message: 'O registro foi excluído com sucesso',
                        color: 'blue',
                        autoClose: 4000,
                        withCloseButton: true,
                      });
                    })
                    .catch((err) => {
                      let title;
                      let message;
                      if (err.response.status === 409) {
                        title = 'Registro já utilizado';
                        message =
                          'Este registro já foi utilizado pelo sistema e não pode ser apagado';
                      } else {
                        title = 'Erro inesperado ocorreu';
                        message = 'Já fomos notificados e estamos trabalhando para corrigir';
                      }

                      showNotification({
                        title,
                        message,
                        color: 'red',
                        autoClose: 4000,
                        withCloseButton: true,
                      });
                    });
                },
              });
            }}>
            <IconTrash size={20} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return (
    <>
      <Group w="100%" justify="space-between" align="center">
        <Title
          style={{
            borderLeft123: '10px solid #7C56DE',
            borderBottom: '10px solid #7C56DE',
            borderRadius: '8px',
          }}
          mb="lg"
          ps={4}>
          {titulo}
        </Title>
        <Button variant="subtle" leftSection={<IconPlus />} onClick={() => navigate('adicionar/')}>
          Novo
        </Button>
      </Group>

      <MantineReactTable table={table} />
    </>
  );
}
