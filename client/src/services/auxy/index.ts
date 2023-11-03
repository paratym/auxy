import { createRpcClient } from '@paratym/auxy-api-client';
import env from '../../env';

export const auxyRpcClient = createRpcClient({
	url: env.AUXY_API_URL,
});
