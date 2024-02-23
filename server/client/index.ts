import * as types from "./generated";

type GenericOptional<K extends PropertyKey, V> = V extends undefined
	? { [k in K]?: V }
	: { [k in K]: V };

type RequestParams<TParams, TBody> = {
	path: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
} & GenericOptional<"params", TParams> &
	GenericOptional<"body", TBody>;

export type ApiResult<T> =
	| { ok: true; data: T }
	| { ok: false; error: types.ApiError };

export class AuxyApiClient {
	private baseUrl: string;

	constructor(url: string) {
		this.baseUrl = url;
	}

	private async request<
		TParams extends Record<string, string> | undefined = undefined,
		TBody = undefined,
		TResponse = undefined,
	>({
		path,
		method = "GET",
		params = {},
		body,
	}: RequestParams<TParams, TBody>): Promise<ApiResult<TResponse>> {
		const url = new URL(path, this.baseUrl);
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.append(key, value);
		}

		const response = await fetch(url.toString(), {
			method,
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: body === undefined ? undefined : JSON.stringify(body),
		});

		const json = await response.json();
		return response.ok ? { ok: true, data: json } : { ok: false, error: json };
	}

	async authSignIn(body: types.PasswordCredentials) {
		return await this.request({
			path: "/auth/sign-in",
			method: "POST",
			body,
		});
	}

	async authSignUp(body: types.PasswordCredentials) {
		return await this.request({
			path: "/auth/sign-up",
			method: "POST",
			body,
		});
	}

	async authSignOut() {
		return await this.request({
			path: "/auth/sign-out",
			method: "POST",
		});
	}
}
