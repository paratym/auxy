import { Dialog as KDialog } from "@kobalte/core/dialog";
import { ComponentProps, ValidComponent, splitProps } from "solid-js";
import { GenericOptionalProperty } from "../utils"
import { Surface } from ".";

export type DialogProps<C extends ValidComponent> =
	ComponentProps<typeof KDialog>
	& GenericOptionalProperty<"triggerProps", ComponentProps<C>> & {
		trigger: C,
	};

export function Dialog<C extends ValidComponent>(_props: DialogProps<C>) {
	const [props, kProps] = splitProps(_props, ["trigger", "triggerProps"])

	return (
		<KDialog modal preventScroll {...kProps}>
			<KDialog.Trigger as={props.trigger} {...props.triggerProps!} />
			<KDialog.Portal>
				<KDialog.Overlay as={Surface} variant="background">
					<KDialog.Content>
					</KDialog.Content>
				</KDialog.Overlay>
			</KDialog.Portal>
		</KDialog>
	)
}
