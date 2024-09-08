import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function withRoleAuth<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: string[]
): React.ComponentType<T> {
  return function WithRoleAuth(props: T) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
            <p className="mt-2 text-lg font-semibold text-gray-700">
              Loading...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we prepare your content.
            </p>
          </div>
        </div>
      );
    }

    if (!session || !allowedRoles.includes(session.user.role as string)) {
      router.push("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
