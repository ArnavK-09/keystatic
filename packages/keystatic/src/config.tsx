import { ComponentSchema, SlugFormField } from './form/api';
import type { Locale } from './app/l10n/locales';
import { RepoConfig } from './app/repo-config';

export type DataFormat = 'json' | 'yaml';
export type Format = DataFormat | { data?: DataFormat; contentField?: string };
export type EntryLayout = 'content' | 'form';
export type Glob = '*' | '**';
export type Collection<
  Schema extends Record<string, ComponentSchema>,
  SlugField extends string
> = {
  label: string;
  path?: `${string}/${Glob}` | `${string}/${Glob}/${string}`;
  entryLayout?: EntryLayout;
  format?: Format;
  previewUrl?: `${string}{slug}${string}`;
  slugField: SlugField;
  schema: Schema;
};

export type Singleton<Schema extends Record<string, ComponentSchema>> = {
  label: string;
  path?: string;
  entryLayout?: EntryLayout;
  format?: Format;
  previewUrl?: string;
  schema: Schema;
};

type CommonConfig = {
  locale?: Locale;
  cloud?: { project: string };
};

type CommonRemoteStorageConfig = {
  pathPrefix?: string;
  branchPrefix?: string;
};

type GitHubStorageConfig = {
  kind: 'github';
  repo: RepoConfig;
} & CommonRemoteStorageConfig;

export type GitHubConfig<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  }
> = {
  storage: GitHubStorageConfig;
  collections?: Collections;
  singletons?: Singletons;
} & CommonConfig;

type LocalStorageConfig = { kind: 'local' };

export type LocalConfig<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  }
> = {
  storage: LocalStorageConfig;
  collections?: Collections;
  singletons?: Singletons;
} & CommonConfig;

type CloudStorageConfig = { kind: 'cloud' } & CommonRemoteStorageConfig;

export type CloudConfig<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  }
> = {
  storage: CloudStorageConfig;
  cloud: { project: string };
  collections?: Collections;
  singletons?: Singletons;
} & CommonConfig;

export type Config<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  }
> = {
  storage: LocalStorageConfig | GitHubStorageConfig | CloudStorageConfig;
  collections?: Collections;
  singletons?: Singletons;
} & ({} extends Collections ? {} : { collections: Collections }) &
  ({} extends Singletons ? {} : { singletons: Singletons }) &
  CommonConfig;

export function config<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  }
>(config: Config<Collections, Singletons>) {
  return config;
}

export function collection<
  Schema extends Record<string, ComponentSchema>,
  SlugField extends {
    [K in keyof Schema]: Schema[K] extends SlugFormField<any, any, any, any>
      ? K
      : never;
  }[keyof Schema]
>(
  collection: Collection<Schema, SlugField & string>
): Collection<Schema, SlugField & string> {
  return collection;
}

export function singleton<Schema extends Record<string, ComponentSchema>>(
  collection: Singleton<Schema>
): Singleton<Schema> {
  return collection;
}
