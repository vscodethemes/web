import { Link } from "@remix-run/react";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-12 w-full flex justify-center gap-4">
      <Button variant="ghost" asChild className="text-muted-foreground text-xs">
        <Link to="/railway" target="_blank" className="flex items-center gap-2">
          <span>
            VS Code Themes is happily hosted on{" "}
            <span className="underline">Railway</span>
          </span>
          <OpenInNewWindowIcon />
        </Link>
      </Button>
    </footer>
  );
}
