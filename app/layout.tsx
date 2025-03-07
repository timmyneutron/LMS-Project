import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import ToasterProvider from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

export const metadata: Metadata = {
  title: "LMS Project",
  description: "Learning management system project created by Tim Abrahamsen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body>
          <ConfettiProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
