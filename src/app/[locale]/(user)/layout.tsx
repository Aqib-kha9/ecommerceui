import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserGroupLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
