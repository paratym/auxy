import { Dialog as KDialog } from "@kobalte/core/dialog";
import { ComponentProps, ValidComponent, splitProps } from "solid-js";
import { GenericOptionalProperty } from "@/utils";
import { Surface } from "@/components";
import * as styles from "./dialog.css";

export type DialogProps<C extends ValidComponent> = ComponentProps<
  typeof KDialog
> &
  GenericOptionalProperty<"$trigger", ComponentProps<C>> & {
    trigger: C;
  };

export function Dialog<C extends ValidComponent>(_props: DialogProps<C>) {
  const [props, kProps] = splitProps(_props, [
    "children",
    "trigger",
    "$trigger",
  ]);

  return (
    <KDialog modal preventScroll {...kProps}>
      <KDialog.Trigger
        as={props.trigger}
        {...(props.$trigger as ComponentProps<C>)}
      />
      <KDialog.Portal>
        <KDialog.Overlay
          as={Surface}
          variant="background"
          class={styles.overlay}
        />
        <KDialog.Content class={styles.layout}>
          {props.children}
        </KDialog.Content>
      </KDialog.Portal>
    </KDialog>
  );
}
