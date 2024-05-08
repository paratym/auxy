import { Input } from "../../../components";
import { ComponentProps } from "solid-js";

type CredentialsFormProps = ComponentProps<"form">;

export function CredentialsForm(props: CredentialsFormProps) {
  return (
    <form method="post" enctype="multipart/form-data" {...props}>
      <Input label="username" min={2} max={32} />
      <Input label="password" type="password" min={4} max={64} />
      <button type="submit">Sign In</button>
      {/* <Show when={submitError()} children={(error) => <span>{error()}</span>} /> */}
    </form>
  );
}
