import { AuxyApiClient } from "@paratym/auxy-api-client";

console.log(import.meta.env);

export const auxy = new AuxyApiClient(
  `http://localhost:${import.meta.env["PUBLIC_API_PORT"]}`,
);
