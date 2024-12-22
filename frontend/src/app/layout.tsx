import "./globals.css";

export const metadata = {
  title: "WebSocket Demo App",
  description: "A demo application showcasing WebSocket communication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
