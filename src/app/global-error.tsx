"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Used only when the root layout itself crashes. It replaces the whole page,
// so it must render its own <html> and <body>. The layout's CSS is not loaded
// here, which is why plain inline styles are used.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Something went seriously wrong
          </h1>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The application hit an unexpected error. Please try again.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Error ID: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.25rem",
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}