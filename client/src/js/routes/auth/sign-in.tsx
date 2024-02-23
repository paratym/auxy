import { z } from "zod";
import { useForm } from "../../utils";
import { auxy } from "../../services";
import { Show } from "solid-js";
import { View } from "../../components";
import { useNavigate } from "@solidjs/router";

const credentialsSchema = z.object({
	username: z.string().min(4).max(32),
	password: z.string().min(4),
});

export function SignInView() {
	const { state, setField, submit, submitError } = useForm({
		initialState: { username: "", password: "" },
		schema: credentialsSchema,
	});

	const navigate = useNavigate();

	return (
		<View authed={false}>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					e.preventDefault();

					submit(async (result) => {
						const res = await auxy.authSignIn(result);
						if (!res.ok) {
							if (
								typeof res.error === "object" &&
								"InvalidInput" in res.error
							) {
								// todo: get field errors from validation report
							}

							throw res.error;
						}

						navigate("/");
					});
				}}
			>
				<label>username</label>
				<input
					value={state.username}
					onChange={(e) => setField("username", e.target.value)}
				/>

				<label>password</label>
				<input
					value={state.password}
					onChange={(e) => setField("password", e.target.value)}
				/>

				<button type="submit">Sign In</button>
				<Show
					when={submitError()}
					children={(error) => <span>{error()}</span>}
				/>
			</form>
		</View>
	);
}
