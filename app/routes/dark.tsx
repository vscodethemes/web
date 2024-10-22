import { redirect, LoaderFunctionArgs } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("theme", "dark");

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
