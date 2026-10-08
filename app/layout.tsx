import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Northbank — Project workspace",
  description: "Plan projects, track tasks, and ship on time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#0f1115",
          color: "#e8e9ec",
        }}
      >
        {children}
      </body>
    </html>
  );
}
