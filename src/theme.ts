import {
  Badge,
  Button,
  Loader,
  Checkbox,
  Pagination,
  NumberInput,
  TextInput,
  Select,
  Switch,
  createTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

export const theme = createTheme({
  fontFamily: 'league-spartan',
  headings: { fontFamily: 'lexend' },
  components: {
    Select: Select.extend({ defaultProps: { size: 'md' } }),
    TextInput: TextInput.extend({ defaultProps: { size: 'md' } }),
    NumberInput: NumberInput.extend({ defaultProps: { size: 'md', allowLeadingZeros: false } }),
    Button: Button.extend({ defaultProps: { color: 'blue', radius: 6 } }),
    Badge: Badge.extend({ defaultProps: { bg: 'blue' } }),
    Loader: Loader.extend({ defaultProps: { color: 'blue' } }),
    Checkbox: Checkbox.extend({ defaultProps: { color: 'blue' } }),
    Pagination: Pagination.extend({ defaultProps: { color: 'blue' } }),
    Switch: Switch.extend({ defaultProps: { color: 'blue' } }),
    DateInput: DateInput.extend({
      defaultProps: { color: 'blue', size: 'md', valueFormat: 'DD/MM/YYYY' },
    }),
  },
});
