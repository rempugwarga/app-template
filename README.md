# my-app — Golden Path rempugwarga

Template aplikasi **stream-aligned**: Rsbuild + React + TypeScript, login OIDC
(PKCE) ke identity platform, komponen design system, dan CI/CD melalui workflow
reusable `platform-ci`.

> **Pemilik template:** Platform Engineering (`@rempugwarga/platform-engineering`)
> **Panduan onboarding:** `platform-docs` → *Onboarding Tim Aplikasi*

## Memulai

```sh
git clone https://github.com/rempugwarga/app-template.git my-app
cd my-app
bun install
cp .env.example .env.local   # isi issuer + client id Anda
bun run dev                  # http://localhost:3000
```

> Catatan rilis: `@rempugwarga/design-system` diambil dari registry. Setelah
> paket dipublikasikan pertama kali, jalankan `bun install` sekali dan commit
> `bun.lock` agar CI `--frozen-lockfile` hijau.

## Yang sudah disiapkan

| Kebutuhan | Status |
| --- | --- |
| Login OIDC (Authorization Code + PKCE) | `src/auth/oidc.ts` (oidc-client-ts) |
| Konfigurasi environment tervalidasi | `src/config.ts` (+ unit test) |
| Komponen design system | `import ... from '@rempugwarga/design-system'` |
| CI (build, test, security) | `.github/workflows/ci.yml` (reusable platform-ci) |
| Deploy staging/prod dengan approval | `.github/workflows/deploy.yml` |
| Secret | Tidak ada di repo — hanya `PUBLIC_*` (bukan rahasia) di `.env.local` |

## Kontrak integrasi (baca sebelum mengubah)

- **OIDC**: `platform-docs` → Identity & OIDC → *Integrasi OIDC*. Jangan simpan
  token di `localStorage`; `oidc-client-ts` default (session storage) aman.
- **Design system**: `platform-docs` → Design System → *Konsumsi & versioning*.
  Upgrade melalui PR Dependabot; breaking change hanya pada versi major.
- **CI/CD**: workflow reusable didokumentasikan di
  `platform-ci/docs/REUSABLE-WORKFLOWS.md`.

## Langkah setelah clone (checklist)

- [ ] Ganti `name` di `package.json` dan perbarui `.github/CODEOWNERS` ke tim Anda
- [ ] Daftarkan client OIDC (PR ke `identity-platform/clients/`) dengan
      `owner` = tim Anda
- [ ] Tambahkan repo ke `platform-ci/repos.yaml` (agar branch protection dibuat
      otomatis)
- [ ] Konfigurasi environment `app-staging` / `app-prod` (approval) di GitHub
