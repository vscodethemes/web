import * as React from 'react';

export default function ErrorView({ children }: React.PropsWithChildren<{}>) {
  return <main className="error-view">{children}</main>;
}
