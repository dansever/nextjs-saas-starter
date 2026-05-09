"use client"

import { cookies } from "next/dist/server/request/cookies";
import Providers from "./providers";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sidebarState = cookieStore.get('sidebar_state')?.value;
    // Parse the cookie value - it will be "true" or "false" as a string
    // Default to true if the cookie doesn't exist yet
    const defaultOpen = sidebarState === 'false' ? false : true;
    
    return (
        <Providers>
            <main>
                {children}
            </main>
        </Providers>
    )
}