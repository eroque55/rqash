import { TTransaction, TTransactionCategory } from '@/types/transaction';

export const mockCategories: TTransactionCategory[] = [
  {
    id: '1',
    name: 'Comida',
    color: '#4f46e5',
    icon: 'GridIcon',
  },
  {
    id: '2',
    name: 'Transporte',
    color: '#3b82f6',
    icon: 'GridIcon',
  },
  {
    id: '3',
    name: 'Entretenimento',
    color: '#f59e0b',
    icon: 'GridIcon',
  },
];

export const mockTransactions: TTransaction[] = [
  {
    id: '1',
    name: 'Compra no supermercado',
    amount: -150,
    date: new Date(),
    category: mockCategories[0],
  },
  {
    id: '2',
    name: 'Passagem de ônibus',
    amount: 3.5,
    date: new Date(),
    category: mockCategories[1],
  },
  {
    id: '3',
    name: 'Assinatura de streaming',
    amount: -29.99,
    date: new Date(),
    category: mockCategories[2],
  },
  {
    id: '4',
    name: 'Almoço no restaurante',
    amount: 45,
    date: new Date(),
    category: mockCategories[0],
  },
  {
    id: '5',
    name: 'Uber para o trabalho',
    amount: 12.5,
    date: new Date(),
    category: mockCategories[1],
  },
  {
    id: '6',
    name: 'Cinema com amigos',
    amount: -20,
    date: new Date(),
    category: mockCategories[2],
  },
  {
    id: '7',
    name: 'Jantar em casa',
    amount: 30,
    date: new Date(),
    category: mockCategories[0],
  },
  {
    id: '8',
    name: 'Táxi para o aeroporto',
    amount: 25,
    date: new Date(),
    category: mockCategories[1],
  },
  {
    id: '9',
    name: 'Show de música',
    amount: 50,
    date: new Date(),
    category: mockCategories[2],
  },
  {
    id: '10',
    name: 'Lanche rápido',
    amount: 10,
    date: new Date(),
    category: mockCategories[0],
  },
];
