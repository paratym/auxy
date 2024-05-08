import { Dialog } from "@kobalte/core/dialog";
import { Surface } from "../../../components";
import { createUniqueId } from "solid-js";
import * as styles from "./upload-dialog.css";
import { auxyApi } from "../../../services";

type UploadDialogTriggerProps = {};

export function UploadDialogTrigger(props: UploadDialogTriggerProps) {
	const fileInputId = createUniqueId();

	return (
		<Dialog modal preventScroll>
			<Dialog.Trigger>upload</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay class={styles.overlay} />
				<div class={styles.layout}>
					<Dialog.Content as={Surface} variant="dynamic">
						<form
							action={new URL("/library/upload", auxyApi.BASE_URL).toString()}
							enctype="multipart/form-data"
							method="post"
						>
							<input
								id={fileInputId}
								name="file"
								type="file"
								accept="audio/*"
							/>
							<button type="submit">upload</button>
						</form>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog>
	);
}
