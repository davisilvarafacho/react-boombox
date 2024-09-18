import { Navigate } from 'react-router-dom';
import { sessionKeys } from 'constants/sessionKeys';
import { validateJwt } from 'utils/jwt';
import { PropsWithChildren } from 'react';

export function RouteGuard({ children }: PropsWithChildren) {
  const token = localStorage.getItem(sessionKeys.jwt) ?? '';
  const { valid } = validateJwt(token);
  return valid ? children : <Navigate to="/" />;
}
