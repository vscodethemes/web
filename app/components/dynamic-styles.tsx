import { useMatches } from "@remix-run/react";

export interface DynamicStylesFunction<T> {
  (args: { data: T }): string;
}

export function DynamicStyles() {
  let styles: Array<{ id: string; style?: string }> = useMatches().map(
    (match) => {
      const handle = match.handle;

      if (isDynamicStylesHandle(handle)) {
        return {
          id: match.id,
          style: handle.dynamicStyle({ data: match.data }),
        };
      }

      return { id: match.id };
    }
  );

  return (
    <>
      {styles.map(({ id, style }) =>
        style ? (
          <style key={id} dangerouslySetInnerHTML={{ __html: style }} />
        ) : null
      )}
    </>
  );
}

function isDynamicStylesHandle<T>(
  handle: unknown
): handle is { dynamicStyle: DynamicStylesFunction<T> } {
  return (
    typeof handle === "object" &&
    typeof (handle as any)?.dynamicStyle === "function"
  );
}
