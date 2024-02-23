use tokio::process::Command;

pub async fn serve() {
    if cfg!(debug_assertions) {
        Command::new("npm")
            .arg("run")
            .arg("dev")
            .arg("--workspace")
            .arg("client")
            .kill_on_drop(true)
            .spawn()
            .expect("failed to spawn client dev server")
            .wait()
            .await
            .expect("cliet server exited");

        return;
    }

    todo!()
}
