import { z } from "zod";
import { useForm } from "../../utils";
import { auxy } from "../../services";
import { Show } from "solid-js";

const credentialsSchema = z.object({
  username: z.string().min(4).max(32),
  password: z.string().min(4),
});

export function SignUpView() {
  const { state, setField, submit, submitError } = useForm({
    initialState: { username: "", password: "" },
    schema: credentialsSchema,
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();

        submit(async (result) => {
          console.log(result);
          const res = await auxy.authSignUp(result);
          console.log(res);
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

      <button type="submit">Sign Up</button>
      <Show when={submitError()} children={(error) => <span>{error()}</span>} />
    </form>
  );
}
