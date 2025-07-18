import { ClerkProvider } from "@clerk/nextjs"
import { dark } from '@clerk/themes'

import "./globals.css"

import Script from "next/script"

export const metadata = {
  title: "TattvaWatch",
  description: "Your ultimate movie discovery platform. Find, curate, and explore the best films with personalized recommendations and watchlists.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      appearance={{ 
        baseTheme: dark,
        variables: { colorPrimary: 'orange' }, 
    }}>
      <html lang="en" className="dark">
        <body className="antialiased bg-black text-white overflow-x-hidden">
          {children}
          <Script src="https://cdn.lordicon.com/lordicon.js"/>
        </body>
      </html>
    </ClerkProvider>
  );
}
