import ReactDOM from "react-dom/client";

import { createApp } from "./setup/Setup";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  createApp()
);
