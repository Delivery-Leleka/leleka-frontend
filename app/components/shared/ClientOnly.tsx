import { useEffect, useState, type ReactNode } from "react";

export const ClientOnly = ({ children }: { children: () => ReactNode }) => {
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => setMounted(true), [])
    return mounted ? children(): null
}