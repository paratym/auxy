use simple_logger::{set_up_color_terminal, SimpleLogger};

pub fn init() {
    set_up_color_terminal();
    SimpleLogger::new()
        .with_level(log::LevelFilter::Debug)
        .init();
}
