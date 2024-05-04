import { auxyApi } from "../../services";
import { View, Input } from "../../components";
import { useNavigate } from "@solidjs/router";
import { CredentialsForm } from "./components";

export function SignInView() {
	const navigate = useNavigate();

	return (
		<View
			public
			$overlay={{
				children: (
					<CredentialsForm
						onSubmit={async (result) => {
							const res = await auxyApi.client.auth.signIn(result);
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
						}}
					/>
				),
			}}
		/>
	);
}
