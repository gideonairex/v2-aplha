export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      version?: string;
      PORT?: number;
      DATABASE_URL: string;
    }
  }
}
