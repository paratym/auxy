import { render } from "solid-js/web";
import { Router, themeClass } from "./js";

const root = document.querySelector("#root")!;
root.classList.add(themeClass);

const dispose = render(Router, root);
if (import.meta.hot) import.meta.hot.dispose(dispose);
