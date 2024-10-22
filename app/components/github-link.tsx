import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export function GithubLink() {
  return (
    <Button
      variant="ghost"
      asChild
      className="hidden sm:flex px-3 text-muted-foreground"
    >
      <a title="Github" href="https://github.com/vscodethemes/web">
        <GitHubLogoIcon className="h-4 w-4" />
      </a>
    </Button>
  );
}
