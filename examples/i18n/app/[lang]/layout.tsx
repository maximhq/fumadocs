import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { I18nProvider } from 'fumadocs-ui/i18n';
import { pageTree } from '@/app/source';
import { DocsLayout } from 'fumadocs-ui/layout';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: ReactNode;
}) {
  return (
    <html lang={lang} className={inter.className}>
      <body>
        <I18nProvider
          locale={lang}
          translations={{
            en: {
              name: 'English',
            },
            cn: {
              name: 'Chinese',
              toc: '目錄',
              search: '搜尋文檔',
              lastUpdate: '最後更新於',
              searchNoResult: '沒有結果',
              previousPage: '上一頁',
              nextPage: '下一頁',
            },
          }}
        >
          <RootProvider>
            <DocsLayout
              tree={pageTree[lang]}
              nav={{
                title: lang === 'cn' ? '目錄' : 'My App',
                url: `/${lang}`,
              }}
              i18n
            >
              {children}
            </DocsLayout>
          </RootProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
