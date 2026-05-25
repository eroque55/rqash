import { FlashList } from '@shopify/flash-list';

import { TTransactionPage } from '@/app/(main)/transactions';
import { mockTransactions } from '@/assets/mock/transactions';
import Divider from '@/components/ui/Divider';

import Transaction from '../../Transaction';

type Props = {
  page: TTransactionPage;
};

const TransactionList = ({ page }: Props) => {
  const getData = () => {
    if (page === 'income') {
      return mockTransactions.filter(transaction => transaction.amount > 0);
    }

    if (page === 'expenses') {
      return mockTransactions.filter(transaction => transaction.amount < 0);
    }

    return mockTransactions;
  };

  return (
    <FlashList
      className="rounded-[20px] bg-white p-2 dark:bg-neutral-800"
      data={getData()}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => <Transaction transaction={item} />}
      scrollEnabled={false}
    />
  );
};

export default TransactionList;
