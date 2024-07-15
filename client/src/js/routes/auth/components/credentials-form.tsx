import { Button, Form, TextInput } from "../../../components";
import { ComponentProps } from "solid-js";

type CredentialsFormProps = ComponentProps<"form">;

export function CredentialsForm(props: CredentialsFormProps) {
  return (
    <Form {...props}>
      <TextInput name="username" min={2} max={32} />
      <TextInput name="password" type="password" min={4} max={64} />
      <Button type="submit">Sign In</Button>
    </Form>
  );
}
