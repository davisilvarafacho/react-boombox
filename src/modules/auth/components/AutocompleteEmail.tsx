import { useState } from 'react';
import { Combobox, TextInput, Loader, useCombobox } from '@mantine/core';
import { isEmail } from '@mantine/form';

import { useAuth } from 'hooks/useAuth';

type Props = {
  form: any;
};

export function AutocompleteEmail(props: Props) {
  const { form } = props;

  const [value, setValue] = useState('');
  const [validandoEmail, setValidandoEmail] = useState(false);

  const combobox = useCombobox();

  const options = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'].map((item) => (
    <Combobox.Option value={`${value}@${item}`} key={item}>
      {`${value}@${item}`}
    </Combobox.Option>
  ));

  const { verfifcaCadastroEmail } = useAuth();

  const validarEmail = async () => {
    const invalidacao = isEmail('Esse email não é válido')(value);

    if (invalidacao) {
      form.setFieldError('email', invalidacao);
      return;
    }

    setValidandoEmail(true);
    const emailJaCadastrado = await verfifcaCadastroEmail(value).finally(() =>
      setValidandoEmail(false)
    );

    if (emailJaCadastrado) {
      form.setFieldError('email', 'Esse email já está cadastrado em nossa base de dados');
    } else {
      form.setFieldError('email', null);
    }
  };

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        form.setFieldValue('email', optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}>
      <Combobox.Target>
        <TextInput
          {...form.getInputProps('email')}
          key={form.key('email')}
          label="Email"
          placeholder="Digite seu email"
          onKeyUp={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={(e) => {
            combobox.closeDropdown();
            validarEmail();
            form.getInputProps('email').onBlur?.(e);
          }}
          rightSection={validandoEmail && <Loader size={18} />}
          withAsterisk
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={value.trim().length === 0 || value.includes('@')}>
        <Combobox.Options>{options.length !== 0 && options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
