import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useParams,
} from "@remix-run/react";
import { Header } from "~/components/header";
import { GithubLink } from "~/components/github-link";

export function ExtensionErrorBoundary() {
  const error = useRouteError();
  const params = useParams();
  const publisher = params.slug?.split(".")[0];

  let message = <h1 className="text-2xl">Oops! Something went wrong.</h1>;
  if (isRouteErrorResponse(error) && error.status === 404) {
    message = (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl">Extension not found</h1>
        {publisher && (
          <Link
            className="text-sm text-vsct-1 hover:underline"
            to={`/?q=${publisher}`}
          >
            Try searching for '{publisher}'?
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      <Header>
        <GithubLink />
      </Header>
      <main className="flex-1 px-5 py-10 pb-40 flex items-center justify-center">
        {message}
      </main>
    </>
  );
}
