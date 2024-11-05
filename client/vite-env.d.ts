/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // Add any other variables here, prefixed with VITE_
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
