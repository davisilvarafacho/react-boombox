import { useState, useRef } from 'react';
import {
  ActionIcon,
  Combobox,
  CloseButton,
  TextInput,
  Loader,
  Tooltip,
  InputProps,
  useCombobox,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { IconExclamationMark, IconSearch } from '@tabler/icons-react';

import { useApi } from 'hooks/useApi';

import { getConfiguracao } from './configurations';

type Props<FormValues> = {
  module: Module;
  form: UseFormReturnType<FormValues>;
  chaveForm: string;
  chaveFormInput: keyof FormValues;
  chaveFormDados: keyof FormValues;
  inputProps: InputProps;
  onSubmitCallback: () => void;
  onClearCallback: () => void;
};

export function RecordInput<FormValues>(props: Props<FormValues>) {
  const {
    module,
    form,
    chaveForm,
    chaveFormInput,
    chaveFormDados,
    inputProps = {},
    onSubmitCallback = () => {},
    onClearCallback = () => {},
  } = props;

  const configuracoesModulo = getConfiguracao(module);

  const input = useRef(null);

  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 400);

  const { sendGetList } = useApi(configuracoesModulo.endpoint);

  const { data, isLoading: carregando } = useQuery({
    queryKey: [
      configuracoesModulo.endpoint,
      `${configuracoesModulo.apiSearchKey}=${debouncedSearch}`,
    ],
    queryFn: () =>
      sendGetList({
        ...configuracoesModulo.defaultFilters,
        [configuracoesModulo.apiSearchKey]: debouncedSearch,
      }),
  });

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = (data?.resultados ?? []).map((record) => configuracoesModulo.render(record));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(dados) => {
        form.setFieldValue(chaveForm, +dados.id);
        form.setFieldValue(chaveFormInput, dados[configuracoesModulo.exibitionKey]);
        form.setFieldValue(chaveFormDados, dados);
        combobox.closeDropdown();
        onSubmitCallback(dados);
      }}>
      <Combobox.Target>
        <TextInput
          ref={input}
          label={configuracoesModulo.label}
          pointer
          leftSection={
            <ActionIcon
              variant="transparent"
              c={chaveFormInput in form.errors ? 'red' : 'primary'}
              aria-label="Pesquisar"
              onClick={() => combobox.openDropdown()}
              tabIndex={-1}>
              <IconSearch />
            </ActionIcon>
          }
          /* rightSection={
            chaveFormInput in form.errors ? (
              <IconExclamationMark />
            ) : (
              form.getValues()[chaveFormInput] !== '' &&
              !input.current?.disabled && (
                <Tooltip label="Limpar campo">
                  <CloseButton
                    size="sm"
                    onMouseDown={(event) => {
                      if (input.current.disabled) return;

                      event.preventDefault();
                      onClearCallback();
                      form.setFieldValue(chaveForm, null);
                      form.setFieldValue(chaveFormInput, '');
                      form.setFieldValue(chaveFormDados, null);
                      if (inputProps.withAsterisk) combobox.openDropdown();
                    }}
                    aria-label="Limpar campo"
                    tabIndex={-1}
                  />
                </Tooltip>
              )
            )
          }
          onClick={() => combobox.openDropdown()}
          rightSectionPointerEvents={form.getValues()[chaveFormInput] === null ? 'none' : 'all'}
          leftSectionPointerEvents="all"
          readOnly
          {...inputProps}
          {...form.getInputProps(chaveFormInput)} */
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Pesquise aqui"
          rightSectionPointerEvents={value === null ? 'none' : 'all'}
          rightSection={carregando && <Loader size={18} />}
        />
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>
              <IconSearch /> Sem resultados...
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
