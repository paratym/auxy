import { z } from "zod";
import {
  FormOpts,
  CreateStructuredProps,
  splitStructuredProps,
  useForm,
} from "../../../utils";
import { Input } from "../../../components";
import { Show, mergeProps } from "solid-js";

const credentialsSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(4),
});

type CredentialsFormProps = CreateStructuredProps<
  { default: "form" },
  Partial<FormOpts<z.infer<typeof credentialsSchema>>>
>;

export function CredentialsForm(_props: CredentialsFormProps) {
  const [structuredProps, props] = splitStructuredProps(_props, [
    "onSubmit",
    "initialState",
    "schema",
  ] satisfies Array<keyof FormOpts<unknown>>);

  const { state, setField, submit, submitError } = useForm(
    mergeProps(
      {
        initialState: { username: "", password: "" },
        schema: credentialsSchema,
        onSubmit() {},
      },
      props,
    ),
  );

  return (
    <form {...structuredProps.default} onSubmit={submit}>
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
      <Show when={submitError()} children={(error) => <span>{error()}</span>} />
    </form>
  );
}
