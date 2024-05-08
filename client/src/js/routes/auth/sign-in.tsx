import { auxyApi } from "../../services";
import { View } from "../../components";
import { useNavigate } from "@solidjs/router";
import { CredentialsForm } from "./components";

export function SignInView() {
  const navigate = useNavigate();

  return (
    <View public>
      <CredentialsForm
        action={new URL("/auth/sign-in", auxyApi.BASE_URL).toString()}
        // onSubmit={async (result) => {
        //   const res = await auxyApi.client.auth.signIn(result);
        //   if (!res.ok) {
        //     if (typeof res.error === "object" && "InvalidInput" in res.error) {
        //       // todo: get field errors from validation report
        //     }
        //
        //     throw res.error;
        //   }
        //
        //   navigate("/");
        // }}
      />
    </View>
  );
}
