"use client";

import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
       // Optional: Redirect to home or previous page
       // router.push("/"); 
       openAuthModal();
    }
  }, [isLoggedIn, openAuthModal, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Awaiting Authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
