import { Button, FileInput, Form } from "@/components";
import { auxyApi } from "@/services";
import { ComponentProps } from "solid-js";

type UploadFormProps = ComponentProps<"form">;

export function UploadForm(props: UploadFormProps) {
  return (
    <Form action={`${auxyApi.BASE_URL}/library/upload`} {...props}>
      <FileInput />
      <Button type="submit">upload</Button>
    </Form>
  );
}
