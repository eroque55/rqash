import { TTransactionsFilter } from '@/types/transaction';

export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    list: (type: TTransactionsFilter, limit?: number) =>
      [...queryKeys.transactions.all, 'list', type, limit] as const,
    groupedByCategory: () =>
      [...queryKeys.transactions.all, 'groupedByCategory'] as const,
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractQueryKey<T> = T extends (...args: any[]) => infer R ? R : T;

export type TQueryKey = {
  [K in keyof typeof queryKeys]: {
    [P in keyof (typeof queryKeys)[K]]: ExtractQueryKey<
      (typeof queryKeys)[K][P]
    >;
  }[keyof (typeof queryKeys)[K]];
}[keyof typeof queryKeys];
