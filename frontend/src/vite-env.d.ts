interface ImportMetaEnv {
  readonly VITE_URL_SERVICE_NAME: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}