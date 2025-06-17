# ESIEA Ionic Application

This is a mobile and web application built with Ionic (Angular) and Capacitor for Android. It allows users to browse and search places, view details, submit reviews, and manage their own reviews.

## Features

- List and search places
- View place details and average ratings
- Submit reviews (rating + comment)
- Authentication with JWT
- Capacitor integration for Android builds

## Tech Stack

- Framework: Ionic 7 (Angular)
- Language: TypeScript
- HTTP client: Custom `HttpClientService` with auth interceptor
- State & storage: Capacitor Preferences
- Router: Angular Router

## Prerequisites

- Node.js (>= 16.x)
- pnpm (or npm)
- Java JDK & Android SDK (for Android builds)
- Android Studio / Gradle

## Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd 2025_S6_ESIEA_IONIC
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environments:
   - Update `src/environments/environment.ts` with your API base URL.

## Running Locally

### Web (Ionic Serve)

```bash
pnpm ionic serve
```

### Android (Capacitor)

```bash
pnpm build
npx cap sync android
npx cap open android
```

Then run or debug from Android Studio or Gradle CLI.

## Testing

- Unit tests with Karma & Jasmine:
  ```bash
  pnpm test
  ```

## build & Production

```bash
pnpm build
```  
Outputs static assets to the `www/` folder.

## License

[MIT](LICENSE)

---

<p align="center">Powered by Ionic & Capacitor</p>
