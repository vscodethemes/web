import { useMatches } from '@remix-run/react';
import type { AppData } from '@remix-run/server-runtime';

export interface DynamicStylesFunction<Data extends AppData = AppData> {
  (args: { data: Data }): string;
}

export default function DynamicStyles() {
  let styles: Array<{ id: string; style?: string }> = useMatches().map((match) => {
    let fn = match.handle?.dynamicStyle;

    if (typeof fn !== 'function') {
      return { id: match.id };
    }

    return {
      id: match.id,
      style: fn({ data: match.data }),
    };
  });

  return (
    <>
      {styles.map(({ id, style }) =>
        style ? <style key={id} dangerouslySetInnerHTML={{ __html: style }} /> : null,
      )}
    </>
  );
}
