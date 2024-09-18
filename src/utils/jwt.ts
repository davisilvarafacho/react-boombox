import { KJUR } from 'jsrsasign';

const secretKey: string = import.meta.env.VITE_APP_SECRET_KEY;

type TokenLogin = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  sub: string;
  aud: string;
  user_tenant: string;
  user_tenant_id: number;
  user_name: string;
  user_last_name: string;
  user_full_name: string;
  user_email: string;
  iss: string;
};

type DecodeJwtReturn = {
  reason: string | null;
  valid: boolean;
};

export function decodeJwt(jwt: string): TokenLogin {
  const payload = KJUR.jws.JWS.parse(jwt).payloadObj as TokenLogin;
  return payload;
}

export function validateJwt(jwt: string): DecodeJwtReturn {
  if (!jwt) {
    return {
      reason: 'invalid_jwt',
      valid: false,
    };
  }

  const isValidSignature = KJUR.jws.JWS.verifyJWT(jwt, secretKey, {
    alg: ['HS256'],
  });

  if (!isValidSignature) {
    return {
      reason: 'invalid_signature',
      valid: false,
    };
  }

  const decoded = decodeJwt(jwt);
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = decoded.exp;

  if (currentTime > expirationTime) {
    return {
      reason: 'expired',
      valid: false,
    };
  }

  return {
    reason: null,
    valid: true,
  };
}
