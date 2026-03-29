export type AppEnv = {
  Bindings: {
    DB: D1Database;
    WS_MANAGER: DurableObjectNamespace;
    SESSION_SECRET: string;
    SITE_ORIGIN: string;
  };
  Variables: {
    userId: string;
  };
};
