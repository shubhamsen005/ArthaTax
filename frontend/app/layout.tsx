//export const metadata={title:"TaxFiler"};import "./styles/globals.css";export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang="en"><body>{children}</body></html>);}

import "./styles/globals.css";

export const metadata = { title: "TaxFiler" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

