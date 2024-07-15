import { Dialog, Surface, View } from "@/components";
import { UploadForm } from "./components";

export function LibraryView() {
  return (
    <View>
      <Dialog trigger="button" $trigger={{ children: "upload" }}>
        <Surface variant="dynamic">
          <UploadForm />
        </Surface>
      </Dialog>
    </View>
  );
}
