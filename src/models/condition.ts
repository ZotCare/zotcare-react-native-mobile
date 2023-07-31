export type Condition = {
  on?: string;
  key: string;
  default?: boolean;
  op: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin';
  value: string | number | any[];
};
