import { describe, expect, it } from '@rstest/core';
import { readConfig } from '../src/config';

describe('readConfig', () => {
  it('menghasilkan konfigurasi dari environment lengkap', () => {
    const config = readConfig({
      PUBLIC_OIDC_ISSUER:
        'https://id-dev.rempugwarga.example/realms/rempugwarga',
      PUBLIC_OIDC_CLIENT_ID: 'my-app',
    });
    expect(config.oidcIssuer).toBe(
      'https://id-dev.rempugwarga.example/realms/rempugwarga',
    );
    expect(config.oidcClientId).toBe('my-app');
    expect(config.oidcScope).toBe('openid profile email roles');
  });

  it('menormalkan trailing slash pada issuer', () => {
    const config = readConfig({
      PUBLIC_OIDC_ISSUER: 'https://id.example/realms/rempugwarga/',
      PUBLIC_OIDC_CLIENT_ID: 'my-app',
    });
    expect(config.oidcIssuer).toBe('https://id.example/realms/rempugwarga');
  });

  it('gagal jelas bila issuer tidak diisi', () => {
    expect(() => readConfig({ PUBLIC_OIDC_CLIENT_ID: 'my-app' })).toThrow(
      /PUBLIC_OIDC_ISSUER/,
    );
  });

  it('gagal jelas bila client id tidak diisi', () => {
    expect(() =>
      readConfig({ PUBLIC_OIDC_ISSUER: 'https://id.example/realms/x' }),
    ).toThrow(/PUBLIC_OIDC_CLIENT_ID/);
  });

  it('menghormati scope kustom', () => {
    const config = readConfig({
      PUBLIC_OIDC_ISSUER: 'https://id.example/realms/x',
      PUBLIC_OIDC_CLIENT_ID: 'my-app',
      PUBLIC_OIDC_SCOPE: 'openid profile',
    });
    expect(config.oidcScope).toBe('openid profile');
  });
});
