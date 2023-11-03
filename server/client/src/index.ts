import { FetchTransport, createClient } from '@rspc/client';
import { Procedures } from '../generated/rpc-bindings';

type RpcClientOpts = {
	url: string;
};

export function createRpcClient({ url }: RpcClientOpts) {
	return createClient<Procedures>({
		transport: new FetchTransport(`${url}/rpc`),
	});
}
