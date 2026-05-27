import { TCategory } from '@/types/category';
import { TTransaction } from '@/types/transaction';

export const mockCategories: TCategory[] = [
  {
    id: '1',
    name: 'Comida',
    colorHex: '#4f46e5',
    icon: 'GridIcon',
  },
  {
    id: '2',
    name: 'Transporte',
    colorHex: '#3b82f6',
    icon: 'GridIcon',
  },
  {
    id: '3',
    name: 'Entretenimento',
    colorHex: '#f59e0b',
    icon: 'GridIcon',
  },
  {
    id: '4',
    name: 'Saúde',
    colorHex: '#10b981',
    icon: 'GridIcon',
  },
];

export const mockTransactions: TTransaction[] = [
  {
    id: '1',
    description: 'Compra no supermercado',
    amount: -150,
    date: new Date(),
    category: mockCategories[0],
  },
  {
    id: '2',
    description: 'Passagem de ônibus',
    amount: 3.5,
    date: new Date(),
    category: mockCategories[1],
  },
  {
    id: '3',
    description: 'Assinatura de streaming',
    amount: -29.99,
    date: new Date(),
    category: mockCategories[2],
  },
  {
    id: '4',
    description: 'Almoço no restaurante',
    amount: 45,
    date: new Date(),
    category: mockCategories[0],
  },
  {
    id: '5',
    description: 'Uber para o trabalho',
    amount: 12.5,
    date: new Date(),
    category: mockCategories[1],
  },
  {
    id: '6',
    description: 'Cinema com amigos',
    amount: -20,
    date: new Date(),
    category: mockCategories[2],
  },
  {
    id: '7',
    description: 'Jantar em casa',
    amount: 30,
    date: new Date(),
    category: mockCategories[0],
  },
  {
    id: '8',
    description: 'Táxi para o aeroporto',
    amount: 25,
    date: new Date(),
    category: mockCategories[1],
  },
  {
    id: '9',
    description: 'Show de música',
    amount: 50,
    date: new Date(),
    category: mockCategories[2],
  },
  {
    id: '10',
    description: 'Lanche rápido',
    amount: 10,
    date: new Date(),
    category: mockCategories[0],
  },
];
