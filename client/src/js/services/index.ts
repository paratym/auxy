import { AuxyApiClient } from "@paratym/auxy-api-client";

export const auxy = new AuxyApiClient(
  `http://localhost:${import.meta.env["PUBLIC_API_PORT"]}`,
);
