import { routes } from "./js";
import { Router } from "@solidjs/router";
import type { Env as _ } from "../env";

export default function App() {
  return <Router>{routes}</Router>;
}
