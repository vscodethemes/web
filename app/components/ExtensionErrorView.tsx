import { Link, useParams, useSearchParams, useCatch } from '@remix-run/react';
import ErrorView from './ErrorView';

export default function ExtensionErrorView() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const caught = useCatch();

  if (caught.status === 404) {
    const { extensionSlug = '' } = params;
    const [publisherName] = extensionSlug.split('.');

    const to = new URLSearchParams(searchParams);
    to.set('text', publisherName);

    return (
      <ErrorView>
        <h1>Extension not found</h1>
        <Link to={`/?${to.toString()}`}>Try searching for '{publisherName}'?</Link>
      </ErrorView>
    );
  }

  return (
    <ErrorView>
      <h1>Oops! An unknown error has occurred</h1>
    </ErrorView>
  );
}
