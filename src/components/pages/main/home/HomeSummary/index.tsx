import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useTransactionsSummary } from '@/hooks/api/useTransactionApi';
import { formatCurrency } from '@/utils/format';

import HomeSummaryIndicator from './HomeSummaryIndicator';

const HomeSummary = () => {
  const { data } = useTransactionsSummary();

  return (
    <Animated.View
      className="bg-primary-500 w-full gap-5 rounded-[20px] p-5"
      entering={FadeIn}
    >
      <Text className="font-inter_medium text-base text-neutral-300">
        Saldo total
      </Text>

      <Text className="font-inter_extraBold text-3xl text-white">
        {formatCurrency(data?.totalAmount ?? 0)}
      </Text>

      <View className="w-full flex-row gap-5">
        <HomeSummaryIndicator
          iconRotation={180}
          title="Despesas"
          value={data?.expense ?? 0}
        />

        <HomeSummaryIndicator title="Receitas" value={data?.income ?? 0} />
      </View>
    </Animated.View>
  );
};

export default HomeSummary;
