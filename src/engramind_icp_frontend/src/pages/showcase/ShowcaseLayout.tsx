import { Header } from "../../components/ui/showcase/Header";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
import ShowcaseClientLayout from "./client-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  //   const cookieStore = cookies();
  //   const token = (await cookieStore).get("access_token")?.value;
  let name = "Guest";

  //   if (token) {
  //     try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
  //         name?: string;
  //       };
  //       name = decoded.name || "User";
  //     } catch {
  //       name = "Guest";
  //     }
  //   }

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
