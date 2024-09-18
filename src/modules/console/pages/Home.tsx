import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AppShell,
  Avatar,
  Box,
  Button,
  Burger,
  Container,
  Flex,
  Group,
  Title,
  Text,
  Menu,
  ScrollArea,
  Tooltip,
  useMantineColorScheme,
  Select,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconAdjustmentsCog,
  IconChartHistogram,
  IconChevronDown,
  IconMoonFilled,
  IconSunFilled,
} from '@tabler/icons-react';

import { decodeJwt } from 'utils/jwt';
import { sessionKeys } from 'constants/sessionKeys';

const charactersList = [
  {
    id: 'bender',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    content:
      "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
  },

  {
    id: 'carol',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    description: 'One of the richest people on Earth',
    content:
      "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
  },

  {
    id: 'homer',
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    content:
      'Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.',
  },
];

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function MenuAccordion() {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  );
}

export function UserArea() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const jwt = localStorage.getItem(sessionKeys.jwt);

  useEffect(() => {
    if (!jwt) return;

    const { user_full_name: nomeUsuario, user_email: emailUsuario } = decodeJwt(jwt);
    setNome(nomeUsuario);
    setEmail(emailUsuario);
  }, [jwt]);

  return (
    <Flex gap="sm">
      <Avatar />
      <Box>
        <Text>{nome}</Text>
        <Text c="dimmed">{email}</Text>
      </Box>
    </Flex>
  );
}

export function Home() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [opened, { toggle }] = useDisclosure();

  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: 'lg',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md">
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="sm">
          <Burger opened={opened} lineSize={3} onClick={toggle} hiddenFrom="md" size="sm" />

          <Title
            style={{ marginBottom: '-10px' }}
            order={3}
            onClick={() => navigate('/app/')}
            className="brand-title cursor-pointer"
            c="blue"
            opacity="initial">
            React Boombox
          </Title>

          <Group visibleFrom="md">
            <Button variant="subtle" size="sm">
              Vendas/Orçamentos
            </Button>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" size="sm" rightSection={<IconChevronDown />}>
                  Cadastros
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate('produtos/')}>Produtos</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Serviços</Menu.Item>
                <Menu.Item onClick={() => navigate('clientes/')}>Clientes</Menu.Item>
                <Menu.Item onClick={() => navigate('vendedores/')}>Vendedores</Menu.Item>
                <Menu.Item onClick={() => navigate('fornecedores/')}>Fornecedores</Menu.Item>
                <Menu.Item onClick={() => navigate('unidades/')}>Unidades de Medida</Menu.Item>
                <Menu.Item onClick={() => navigate('series/')}>Séries</Menu.Item>
                <Menu.Item onClick={() => navigate('series/')}>Usuários</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" size="sm" rightSection={<IconChevronDown />}>
                  Estoque
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate('estoque-atual-produtos/')}>
                  Estoque Atual dos Produtos
                </Menu.Item>
                <Menu.Item onClick={() => navigate('inventario/')}>Inventário</Menu.Item>
                <Menu.Item onClick={() => navigate('carga-inicial/')}>Carga Inicial</Menu.Item>
                <Menu.Item onClick={() => navigate('transferencia-entre-filiais/')}>
                  Transferência Entre Filiais
                </Menu.Item>
                <Menu.Item onClick={() => navigate('histórico-movimentacoes-estoque/')}>
                  Histórico de Movimentações do Estoque
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" size="sm" rightSection={<IconChevronDown />}>
                  Relatórios
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate('produtos/')}>Produtos</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Pessoas</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Vendas</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Curva ABC Produtos</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Curva ABC Clientes</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" size="sm" rightSection={<IconChevronDown />}>
                  Dashboards
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate('produtos/')}>Ordens de Serviço</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Produtos</Menu.Item>
                <Menu.Item onClick={() => navigate('produtos/')}>Vendas</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Box hiddenFrom="md">
            <Button
              radius="xl"
              variant="subtle"
              size="sm"
              onClick={() => {
                if (colorScheme === 'dark') setColorScheme('light');
                else setColorScheme('dark');
              }}>
              {colorScheme === 'dark' ? <IconSunFilled size={20} /> : <IconMoonFilled size={20} />}
            </Button>

            <Button
              radius="xl"
              variant="subtle"
              size="sm"
              onClick={() => {
                navigate('configuracoes/');
              }}>
              <IconAdjustmentsCog size={20} />
            </Button>
          </Box>

          <Group gap={1} visibleFrom="md">
            <Tooltip label="Uso do Sistema">
              <Button radius="xl" variant="subtle" size="sm">
                <IconChartHistogram size={19} />
              </Button>
            </Tooltip>

            <Tooltip label={colorScheme === 'dark' ? 'Claro' : 'Escuro'}>
              <Button
                radius="xl"
                variant="subtle"
                size="sm"
                onClick={() => {
                  if (colorScheme === 'dark') setColorScheme('light');
                  else setColorScheme('dark');
                }}>
                {colorScheme === 'dark' ? (
                  <IconSunFilled size={20} />
                ) : (
                  <IconMoonFilled size={20} />
                )}
              </Button>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" hiddenFrom="md">
        <AppShell.Section grow component={ScrollArea}>
          <MenuAccordion />
        </AppShell.Section>

        <AppShell.Section>
          <UserArea />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
        <Box mb="100px" hiddenFrom="md" />
      </AppShell.Main>

      <AppShell.Footer p="xs">
        <Flex justify="end">
          <Select
            defaultValue="1"
            data={[
              { label: 'Filial 1', value: '1' },
              { label: 'Filial 2', value: '2' },
              { label: 'Filial 3', value: '3' },
              { label: 'Filial 4', value: '4' },
              { label: 'Filial 5', value: '5' },
            ]}
          />
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
