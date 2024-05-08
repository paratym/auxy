// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { themeContainer } from "./js/theme.css";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/icons/icon.ico" />
					<link rel="stylesheet" href="./index.css.ts" />
					{assets}
				</head>
				<body class={themeContainer}>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
