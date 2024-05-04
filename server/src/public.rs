use tokio::process::Command;

pub async fn serve() -> Result<(), ()> {
    if cfg!(debug_assertions) {
        return Command::new("npm")
            .arg("run")
            .arg("dev")
            .arg("--workspace")
            .arg("client")
            .kill_on_drop(true)
            .spawn()
            .map_err(|_| ())?
            .wait()
            .await
            .map(|_| ())
            .map_err(|_| ());
    }

    todo!()
}
