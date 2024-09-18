import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(() => import('./auth/pages/Login').then(mod => mod.Login));
const EsqueciMinhaSenha = loadable(() => import('./auth/pages/EsqueciMinhaSenha').then(mod => mod.EsqueciMinhaSenha));
const Cadastro = loadable(() => import('./auth/pages/Cadastro').then(mod => mod.Cadastro));

const Home = loadable(() => import('./console/pages/Home').then(mod => mod.Home));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'esqueci-minha-senha/',
    element: <EsqueciMinhaSenha />,
  },
  {
    path: 'cadastro/',
    element: <Cadastro />,
  },
  {
    path: 'app/',
    element: <Home />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
