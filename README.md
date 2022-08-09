# PROPCOM NFT MARKET

## 1. Technical overview
### a. Technical support
- [Node >= v8.11.3](https://nodejs.org/en/download/)
- [Yarn >= 1.7.0](https://yarnpkg.com/en/docs/install#debian-stable)
- [Nextjs >= 12.1.0](https://nextjs.org/docs)

### b. Folders structure
Root path: src/

```bash
src
├── api
│   └── <api-name>
│       ├── index.ts
│       └── index.interface.ts
├── assets
│   ├── fonts
│       ├── first.ttf
│       └── second.ttf
│   ├── images
│   │   ├── first.png
│   │   ├── second.svg
│   │   └── third.svg
│   │   └── 
│   └── styles
│       ├── first.style.ts
│       └── second.style.ts
│
├── components
│   └── <component-name>
│       ├── index.style.ts
│       ├── index.tsx
│       └── index.utils.ts    // includes: interfaces, hooks, constants, functions, ...
│
├── constants
│   └── index.const.ts        // Define a common variable
│
├── hooks
│   ├── useFirstHook.ts
│   └── useSecondHook.ts
│
├── layouts
│   ├── components
│   │   ├── footer
│   │   │   ├── index.style.ts
│   │   │   └── index.tsx
│   │   ├── navbar
│   │   └── sidebar
│   ├── index.style.ts
│   ├── index.tsx
│   ├── index.utils.ts
│   ├── <other-layout>.style.ts
│   ├── <other-layout>.tsx 
│   └── <other-layout>.utils.ts 
│
├── modules
│   └── <modules-name>
│       ├── index.style.ts
│       ├── index.tsx
│       ├── <other-modules>.style.ts 
│       └── <other-modules>.tsx
│
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── <other-page-name>.tsx
│
└── utils
    ├── colors.ts
    ├── crypto-currency-icons.ts
    ├── functions.ts
    ├── interfaces.ts
    └── styles.ts
```

## 2. How to running
### a. **Setup**
- Set these environment variables (see .env.development file).
```BASH
NEXT_PUBLIC_NAME=
REACT_APP_STAGE=
PORT=
NODE_ENV=
APP_ENV=
NEXT_PUBLIC_API_GECKO_URL="https://api.coingecko.com/api/v3"
```

### b. **Installation**
#### Install node modules
```sh
yarn install
```

#### Development
Once all dependencies have been installed you can start development. To start a development server on http://localhost:3000 run:
```sh
yarn dev
```

#### Production
To run your application in production make sure to run a build first:
```sh
yarn build
```

#### Linters
Run check conventions with Eslints
```sh
yarn lint
```