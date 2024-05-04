import { auxyApi } from "../../services";
import { View } from "../../components";
import { useNavigate } from "@solidjs/router";
import { CredentialsForm } from "./components";

export function SignUpView() {
  const navigate = useNavigate();

  return (
    <View
      public
      $overlay={{
        children: (
          <CredentialsForm
            onSubmit={async (result) => {
              const res = await auxyApi.client.auth.signUp(result);
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
