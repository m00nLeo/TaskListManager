import { StrictMode } from "react";
// import { createRoot } from 'react-dom/client'
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
// Telling the that we using React-query (only Call one new QueryClient)
const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
