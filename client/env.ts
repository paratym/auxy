import { z, ZodError } from "zod";

export type Env = z.infer<typeof envVariables>;

declare global {
  interface ImportMetaEnv extends Pick<Env, `PUBLIC_${string}` & keyof Env> {}

  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

const envVariables = z.object({
  PUBLIC_SERVER_URL: z.string().url(),
  PUBLIC_SERVER_REST_PATH: z.string(),
  PUBLIC_SERVER_CLIENT_PATH: z.string(),

  // TODO: make these required for dev env
  DEV_CLIENT_SERVER_PORT: z.string().optional(),
  DEV_SERVER_TS_BINDINGS_PATH: z.string().optional(),
});

try {
  envVariables.parse(process.env);
} catch (error) {
  const message = error instanceof ZodError ? error.message : "unknown";
  console.error(`Error parsing environment variables: ${message}`);
  throw error;
}
