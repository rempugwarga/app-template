export interface AppConfig {
  oidcIssuer: string;
  oidcClientId: string;
  oidcScope: string;
}

export function readConfig(
  env: Record<string, string | undefined>,
): AppConfig {
  const issuer = env.PUBLIC_OIDC_ISSUER;
  const clientId = env.PUBLIC_OIDC_CLIENT_ID;

  if (!issuer) {
    throw new Error(
      'PUBLIC_OIDC_ISSUER belum diisi. Salin .env.example ke .env.local dan isi issuer environment (lihat platform-docs: Environment & URL).',
    );
  }
  if (!clientId) {
    throw new Error(
      'PUBLIC_OIDC_CLIENT_ID belum diisi. Daftarkan client terlebih dahulu (lihat platform-docs: Registrasi Client).',
    );
  }

  return {
    oidcIssuer: issuer.replace(/\/$/, ''),
    oidcClientId: clientId,
    oidcScope: env.PUBLIC_OIDC_SCOPE ?? 'openid profile email roles',
  };
}

export function getConfig(): AppConfig {
  return readConfig(import.meta.env as Record<string, string | undefined>);
}
