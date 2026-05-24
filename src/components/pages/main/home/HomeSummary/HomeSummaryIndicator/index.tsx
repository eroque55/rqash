import { Text, View } from 'react-native';

import { Icon } from '@/components/ui';
import { colors } from '@/global/colors';
import { formatCurrency } from '@/utils/format';

type Props = {
  title: string;
  value: number;
  iconRotation?: number;
};

const HomeSummaryIndicator = ({ title, value, iconRotation = 0 }: Props) => {
  return (
    <View className="bg-primary-400 flex-1 flex-row items-center gap-3 rounded-[20px] p-3">
      <View className="bg-primary-300 rounded-full p-3">
        <Icon
          color={colors.white}
          name="ArrowIcon"
          rotate={iconRotation}
          size={12}
        />
      </View>

      <View className="flex-1 gap-1">
        <Text className="font-inter_medium text-xs text-neutral-300">
          {title}
        </Text>

        <Text className="font-inter_semiBold text-sm text-white">
          {formatCurrency(value)}
        </Text>
      </View>
    </View>
  );
};

export default HomeSummaryIndicator;
