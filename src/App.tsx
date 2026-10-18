import { useEffect, useState } from 'react';
import Provider from '@rempugwarga/design-system';
import {
  completeLoginIfCallback,
  createUserManager,
  login,
  logout,
} from './auth/oidc';

interface UserProfile {
  name?: string;
  email?: string;
}

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const manager = createUserManager();

    void (async () => {
      try {
        await completeLoginIfCallback();
        const current = await manager.getUser();
        if (current && !current.expired) {
          setUser({
            name: current.profile.name,
            email: current.profile.email,
          });
        }
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : 'Gagal memproses login',
        );
      }
    })();

    const onUserLoaded = (loaded: { profile: { name?: string; email?: string } }) => {
      setUser({ name: loaded.profile.name, email: loaded.profile.email });
    };
    manager.events.addUserLoaded(onUserLoaded);
    return () => manager.events.removeUserLoaded(onUserLoaded);
  }, []);

  return (
    <main>
      <Provider />
      <section>
        {user ? (
          <>
            <p>
              Masuk sebagai <strong>{user.name ?? user.email ?? 'pengguna'}</strong>
            </p>
            <button type="button" onClick={() => void logout()}>
              Keluar
            </button>
          </>
        ) : (
          <button type="button" onClick={() => void login()}>
            Masuk dengan platform identity
          </button>
        )}
        {error ? <p role="alert">{error}</p> : null}
      </section>
    </main>
  );
}
