import { Dialog } from "@kobalte/core/dialog";
import { Surface } from "../../../components";
import { createUniqueId } from "solid-js";
import * as styles from "./upload-dialog.css";
import { useForm } from "../../../utils";
import { z } from "zod";

type UploadDialogTriggerProps = {};

export function UploadDialogTrigger(props: UploadDialogTriggerProps) {
  const fileInputId = createUniqueId();
  const { setField, submit } = useForm({
    schema: z.object({ file: z.any() }),
    onSubmit: () => {},
  });

  return (
    <Dialog modal preventScroll>
      <Dialog.Trigger>upload</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class={styles.overlay} />
        <div class={styles.layout}>
          <Dialog.Content as={Surface} variant="dynamic">
            <form
              action="/"
              enctype="multipart/form-data"
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            >
              <input
                id={fileInputId}
                type="file"
                accept="audio/*"
                onChange={console.log}
              />
              <button type="submit">upload</button>
            </form>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
}
