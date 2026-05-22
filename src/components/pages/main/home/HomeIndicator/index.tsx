import { Text, View } from 'react-native';

import { Icon } from '@/components/ui';
import { colors } from '@/global/colors';
import { formatCurrency } from '@/utils/format';

type Props = {
  title: string;
  value: number;
};

const HomeIndicator = ({ title, value }: Props) => {
  return (
    <View className="flex-1 flex-row items-center gap-3 rounded-[20px] bg-primary-400 p-3">
      <View className="rounded-full bg-primary-300 p-3">
        <Icon color={colors.white} name="ChevronIcon" size={20} />
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

export default HomeIndicator;
