import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { formatCurrency } from '@/utils/format';

import HomeSummaryIndicator from './HomeSummaryIndicator';

const HomeSummary = () => {
  return (
    <Animated.View
      className="bg-primary-500 w-full gap-5 rounded-[20px] p-5"
      entering={FadeIn}
    >
      <Text className="font-inter_medium text-base text-neutral-300">
        Saldo total
      </Text>

      <Text className="font-inter_extraBold text-3xl text-white">
        {formatCurrency(1234.56)}
      </Text>

      <View className="w-full flex-row gap-5">
        <HomeSummaryIndicator
          iconRotation={180}
          title="Receitas"
          value={1234.56}
        />

        <HomeSummaryIndicator title="Despesas" value={1234.56} />
      </View>
    </Animated.View>
  );
};

export default HomeSummary;
