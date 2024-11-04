import { redirect, LoaderFunctionArgs } from "@remix-run/node";
import plausible from "~/clients/plausible";

export async function loader({ request }: LoaderFunctionArgs) {
  plausible.event(request, "Railway Referal");
  return redirect("https://railway.app?referralCode=vsct");
}
