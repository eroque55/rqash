export type TCategory = {
  id: string;
  name: string;
  colorHex: string;
  iconUrl: string;
};

export type TExpenseCategory = {
  id: string;
  category: TCategory;
  ammount: number;
  percentage: number;
};
