import { createRoot } from "react-dom/client";
import App from "./App";
// Override default browser keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "k" || e.key === "p")) {
    e.preventDefault();
  }
  // Enable Ctrl + R only in dev mode
  if (e.ctrlKey && e.key === "r" && process.env.NODE_ENV === "development") {
    e.preventDefault();
    window.location.reload();
  }
});


createRoot(document.getElementById("root")!).render(<App />);
