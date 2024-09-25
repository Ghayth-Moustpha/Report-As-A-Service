// app/layout.tsx
import './globals.css';  // You can import global styles here

export default function RootLayout({
  children,  // This will contain the page-specific content
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
        </header>
        
        <main>{children}</main>  {/* This renders the page content */}
      
      </body>
    </html>
  );
}
