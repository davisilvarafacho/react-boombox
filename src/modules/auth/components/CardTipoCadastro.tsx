import { ReactNode } from 'react';
import { Button, Card, Text, Title } from '@mantine/core';

type Props = {
  titulo: string;
  subtitulo: string;
  texto: string;
  image: ReactNode;
  onClickEscolher: () => void;
};

export function CardTipoCadastro(props: Props) {
  const { titulo, subtitulo, texto, image, onClickEscolher } = props;

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder mt={30}>
      <Card.Section pt={16} px={12}>
        {image}
      </Card.Section>

      <Title ta="center" mt="lg">
        {titulo}
      </Title>

      <Title order={6} c="dimmed" ta="center" mt={8}>
        {subtitulo}
      </Title>

      <Text ta="center" size="md" mt="sm">
        {texto}
      </Text>

      <Button color="blue" fullWidth mt="xl" radius="md" onClick={onClickEscolher}>
        Escolher
      </Button>
    </Card>
  );
}

export default CardTipoCadastro;
