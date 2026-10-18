import { UserManager } from 'oidc-client-ts';
import { getConfig } from '../config';

export const CALLBACK_PATH = '/callback';

export function createUserManager(): UserManager {
  const { oidcIssuer, oidcClientId, oidcScope } = getConfig();

  return new UserManager({
    authority: oidcIssuer,
    client_id: oidcClientId,
    redirect_uri: `${window.location.origin}${CALLBACK_PATH}`,
    post_logout_redirect_uri: window.location.origin,
    scope: oidcScope,
  });
}

export async function login(): Promise<void> {
  await createUserManager().signinRedirect();
}

export async function logout(): Promise<void> {
  await createUserManager().signoutRedirect();
}

export async function completeLoginIfCallback(): Promise<boolean> {
  if (window.location.pathname !== CALLBACK_PATH) {
    return false;
  }
  const manager = createUserManager();
  await manager.signinCallback();
  window.history.replaceState({}, '', '/');
  return true;
}
