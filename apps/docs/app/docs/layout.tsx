import { DocsLayout } from '@maximai/fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { docsOptions } from '@/app/layout.config';
import '@maximai/fumadocs-ui/twoslash.css';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
