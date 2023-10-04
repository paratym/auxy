import { FetchTransport, createClient } from '@rspc/client';
import type { Procedures } from './auxy-api-bindings';
import env from '../env';

export const auxyApiClient = createClient<Procedures>({
	transport: new FetchTransport(`${env.AUXY_API_URL}/rpc`),
});
