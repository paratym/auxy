import * as types from "../../../generated/api";

type GenericOptional<K extends PropertyKey, V> = V extends undefined
	? { [k in K]?: V }
	: { [k in K]: V };

type RequestParams<TParams, TBody> = {
	path: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
} & GenericOptional<"params", TParams> &
	GenericOptional<"body", TBody>;

type ClientError = "FetchError";

export type Result<T> =
	| { ok: true; data: T }
	| { ok: false; error: types.ApiError | ClientError };

export async function request<
	TParams extends Record<string, string> | undefined = undefined,
	TBody = undefined,
>({
	path,
	method = "GET",
	params = {},
	body,
}: RequestParams<TParams, TBody>): Promise<Result<unknown>> {
	const url = new URL(path, import.meta.env["PUBLIC_API_URL"]);
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.append(key, value);
	}

	let response: Response;
	try {
		response = await fetch(url.toString(), {
			method,
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: body === undefined ? undefined : JSON.stringify(body),
		});
	} catch (err) {
		return {
			ok: false,
			error: "FetchError",
		};
	}

	return {
		ok: response.ok,
		[response.ok ? "data" : "error"]: response.body
			? await response.json()
			: undefined,
	} as Result<unknown>;
}

export const client = {
	auth: {
		async signIn(body: types.PasswordCredentials) {
			return await request({
				path: "/auth/sign-in",
				method: "POST",
				body,
			});
		},

		async signUp(body: types.PasswordCredentials) {
			return await request({
				path: "/auth/sign-up",
				method: "POST",
				body,
			});
		},

		async signOut() {
			return await request({
				path: "/auth/sign-out",
				method: "POST",
			});
		},
	},
};
