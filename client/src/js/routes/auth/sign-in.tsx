import { z } from "zod";
import { useForm } from "../../utils";
import { auxyApi } from "../../services";
import { Show } from "solid-js";
import { View, Input } from "../../components";
import { useNavigate } from "@solidjs/router";

const credentialsSchema = z.object({
  username: z.string().min(4).max(32),
  password: z.string().min(4),
});

export function SignInView() {
  const navigate = useNavigate();
  const { state, setField, submit, submitError } = useForm({
    initialState: { username: "", password: "" },
    schema: credentialsSchema,
    onSubmit: async (result) => {
      const res = await auxyApi.client.auth.signIn(result);
      if (!res.ok) {
        if (typeof res.error === "object" && "InvalidInput" in res.error) {
          // todo: get field errors from validation report
        }

        throw res.error;
      }

      navigate("/");
    },
  });

  return (
    <View
      public
      $overlay={{
        children: (
          <form onSubmit={submit}>
            <Input
              $label={{ children: "username" }}
              value={state.username}
              onChange={(e) => setField("username", e.target.value)}
            />

            <Input
              $label={{ children: "password" }}
              value={state.password}
              onChange={(e) => setField("password", e.target.value)}
            />

            <button type="submit">Sign In</button>
            <Show
              when={submitError()}
              children={(error) => <span>{error()}</span>}
            />
          </form>
        ),
      }}
    />
  );
}
