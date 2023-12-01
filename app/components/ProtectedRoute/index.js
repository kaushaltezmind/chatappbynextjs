import { useRouter } from "next/router";

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("token") === null
  ) {
    localStorage.setItem("redirectpath", router.pathname);
    router.push("/");
  }

  return children;
};
