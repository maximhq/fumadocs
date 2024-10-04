'use client';

import { useDocsSearch } from 'fumadocs-core/search/client';
import { type ReactNode, useState } from 'react';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { useI18n } from '@/contexts/i18n';
import {
  SearchDialog,
  type SharedProps,
  type TagItem,
  TagsList,
} from './search';

export interface DefaultSearchDialogProps extends SharedProps {
  /**
   * Search tag
   *
   * @deprecated Use Tags API instead
   */
  tag?: string;

  defaultTag?: string;
  tags?: TagItem[];

  /**
   * Search API URL
   */
  api?: string;

  /**
   * The debounced delay for performing a search.
   */
  delayMs?: number;

  footer?: ReactNode;
}

export default function DefaultSearchDialog({
  defaultTag,
  tags,
  api,
  delayMs,
  ...props
}: DefaultSearchDialogProps): React.ReactElement {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);
  const { search, setSearch, query } = useDocsSearch(locale, tag, api, delayMs);

  useOnChange(defaultTag, (v) => {
    setTag(v);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      results={query.data ?? []}
      {...props}
      footer={
        tags ? (
          <>
            <TagsList tag={tag} onTagChange={setTag} items={tags} />
            {props.footer}
          </>
        ) : (
          props.footer
        )
      }
    />
  );
}
