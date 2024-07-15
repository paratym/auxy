import { Router } from "@solidjs/router";
import { ServiceProvider, routes } from "./js";
import "./global.css";

export default function App() {
  return (
    <ServiceProvider>
      <Router>{routes}</Router>
    </ServiceProvider>
  );
}
