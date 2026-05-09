"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ClerkProvider>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </ClerkProvider>
            </ConvexProviderWithClerk>
            <Toaster />
        </NextThemesProvider>
    )
}