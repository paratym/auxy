// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultPlatformTheme } from "./js";
import "./env";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icons/icon.ico" />
          {assets}
        </head>
        <body class={defaultPlatformTheme}>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
