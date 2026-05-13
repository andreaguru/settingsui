# EdID

The Settings-UI project is the frontend layer of Settings-API.
It's based on [Next.js](https://nextjs.org/).
Design and components are based on [MUI](https://mui.com/).

## Project Structure

- `components/` – React components
- `context/` – React context providers
- `services/` – API and business logic
- `types/` – TypeScript type definitions
- `utils/` – Utility functions
- `assets/` – Static assets
- `pages/` – Next.js pages and API routes
- `public/` – Public assets served by Next.js
- `test/` – Unit and integration tests
- `envs/` – Environment-specific configurations
- `themes/` – MUI theme configuration`

## How to use

1) Clone the Repository on local and go to the project root:

<!-- #master-branch-switch -->

2) Install the packages:

```sh
npm install
```

Important: Node version must be minimum 20.0.0

## Develop

You always can start the web application in three different ways:

- ```npm run dev``` Starts local dev server at `localhost:3000`
- ```npm run dev:staging``` dev mode with access to staging APIs. This is the best option for local
  development.
- ```npm run start:production``` production mode using the web packed artifacts (ensure the app was built
  with ```npm run build``` before)

## Linting & Formatting

Lint code:

```sh
npm run eslint
```

Fix lint errors:

```sh
npm run eslint:fix
```

Format code:

```sh
npm run format
```
