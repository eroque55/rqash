export type TCategory = {
  id: string;
  name: string;
  colorHex: string;
  iconUrl: string;
};

export type TExpenseCategory = {
  category: TCategory;
  ammount: number;
  percentage: number;
};
