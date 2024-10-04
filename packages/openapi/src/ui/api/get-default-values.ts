import type { PrimitiveRequestField, RequestSchema } from '@/render/playground';
import { resolve } from '@/ui/api/resolve';

export function getDefaultValue(
  item: RequestSchema,
  references: Record<string, RequestSchema>,
): unknown {
  if (item.type === 'object')
    return Object.fromEntries(
      Object.entries(item.properties).map(([key, prop]) => [
        key,
        getDefaultValue(references[prop.schema], references),
      ]),
    );

  if (item.type === 'array') return [];
  if (item.type === 'null') return null;
  if (item.type === 'switcher')
    return getDefaultValue(
      resolve(Object.values(item.items)[0], references),
      references,
    );
  if (item.type === 'file') return undefined;

  return String(item.defaultValue);
}

export function getDefaultValues(
  field: PrimitiveRequestField[],
  context: Record<string, RequestSchema>,
): Record<string, unknown> {
  return Object.fromEntries(
    field.map((p) => [p.name, getDefaultValue(p, context)]),
  );
}
