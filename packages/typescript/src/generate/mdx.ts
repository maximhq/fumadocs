import * as path from 'node:path';
import { type TypescriptConfig, getProgram, getFileSymbol } from '@/program';
import {
  type DocEntry,
  type GeneratedDoc,
  generate,
  type GenerateOptions,
} from './base';

interface Templates {
  block: (doc: GeneratedDoc, children: string) => string;
  property: (entry: DocEntry) => string;
}

export interface GenerateMDXOptions extends GenerateOptions {
  /**
   * a root directory to resolve relative file paths
   */
  basePath?: string;
  templates?: Partial<Templates>;
  config?: TypescriptConfig;
}

// \r?\n is required for cross-platform compatibility
const regex =
  /^---type-table---\r?\n(?<file>.+?)(?:#(?<name>.+))?\r?\n---end---$/gm;

const defaultTemplates: Templates = {
  block: (doc, c) => `### ${doc.name}

${doc.description}

<div className='*:border-b [&>*:last-child]:border-b-0'>${c}</div>`,

  property: (c) => `<div className='text-sm text-fd-muted-foreground py-4'>

<div className="flex flex-row items-center gap-4">
  <code className="text-sm">${c.name}</code>
  <code className="text-fd-muted-foreground">{${JSON.stringify(c.type)}}</code>
</div>

${c.description || 'No Description'}

${Object.entries(c.tags)
  .map(([tag, value]) => `- ${tag}:\n${replaceJsDocLinks(value)}`)
  .join('\n')}

</div>`,
};

export function generateMDX(
  source: string,
  {
    basePath = './',
    templates: overrides,
    config: options,
    ...rest
  }: GenerateMDXOptions = {},
): string {
  const templates = { ...defaultTemplates, ...overrides };
  const program = getProgram(options);

  return source.replace(regex, (...args) => {
    const groups = args[args.length - 1] as Record<string, string>;
    const file = path.resolve(basePath, groups.file);
    const fileSymbol = getFileSymbol(file, program);
    if (!fileSymbol) throw new Error(`${file} doesn't exist`);

    let docs: GeneratedDoc[];

    if (!groups.name) {
      docs = program
        .getTypeChecker()
        .getExportsOfModule(fileSymbol)
        .map((symbol) => generate(program, symbol, rest));
    } else {
      const symbol = program
        .getTypeChecker()
        .getExportsOfModule(fileSymbol)
        .find((s) => s.getEscapedName().toString() === groups.name);
      if (!symbol) throw new Error(`Type ${groups.name} doesn't exist`);

      docs = [generate(program, symbol, rest)];
    }

    return docs
      .map((doc) =>
        templates.block(doc, doc.entries.map(templates.property).join('\n')),
      )
      .join('\n\n');
  });
}

function replaceJsDocLinks(md: string): string {
  return md.replace(/{@link (?<link>[^}]*)}/g, '$1');
}
