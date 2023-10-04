import { z } from 'zod';

const processEnv = z
	.object({
		PUBLIC_AUXY_API_URL: z.string().url(),
	})
	.parse(import.meta.env);

const keyPrefix = 'PUBLIC_';
type ProcessEnv = typeof processEnv;
type Env = {
	[K in keyof ProcessEnv as K extends `${typeof keyPrefix}${infer R}` ? R : never]: ProcessEnv[K];
};

export default Object.fromEntries(
	Object.entries(processEnv).map(([key, value]) => [key.replace(keyPrefix, ''), value])
) as Env;
