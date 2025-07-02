import { Header } from "../../components/ui/showcase/Header";
import Cookies from "js-cookie";
import ShowcaseClientLayout from "./client-layout";
import { jwtVerify } from "jose";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token");
  let name = "Guest";

  if (token) {
    try {
      if (token) {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        //   name?: string;
        // };
        name = "User";
      }
    } catch {
      name = "Guest";
    }
  }

  return (
    <ShowcaseClientLayout name={name}>
      <div className="relative bg-zinc-50 dark:bg-zinc-900 min-h-screen overflow-auto">
        <Header name={name} />
        <div className="max-w-7xl mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
          {children}
        </div>
      </div>
    </ShowcaseClientLayout>
  );
}
