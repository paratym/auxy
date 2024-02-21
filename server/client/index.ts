import * as types from "./generated";

type GenericOptional<K extends PropertyKey, V> = V extends undefined
	? { [k in K]?: V }
	: { [k in K]: V };

type RequestParams<TParams, TBody> = {
	path: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
} & GenericOptional<"params", TParams> &
	GenericOptional<"body", TBody>;

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
	}: RequestParams<TParams, TBody>): Promise<TResponse> {
		const url = new URL(path, this.baseUrl);
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.append(key, value);
		}

		const response = await fetch(url.toString(), {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body === undefined ? undefined : JSON.stringify(body),
		});

		return (await response.json()) as TResponse;
	}

	async authSignIn(body: types.PasswordCredentials) {
		await this.request({
			path: "/auth/sign-in",
			method: "POST",
			body,
		});
	}

	async authSignUp(body: types.PasswordCredentials) {
		await this.request({
			path: "/auth/sign-up",
			method: "POST",
			body,
		});
	}

	async authSignOut() {
		await this.request({
			path: "/auth/sign-out",
			method: "POST",
		});
	}
}
