import { Href, usePathname, useRouter } from 'expo-router';
import { Text } from 'react-native';

import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

import Icon, { TIcon } from '../../Icon';
import Pressable from '../../Pressable';

type Props = {
  icon: TIcon;
  label: string;
  href: Href;
};

const TabBarItem = ({ icon, label, href }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark } = useTheme();

  const isSelected = String(href).includes(pathname);

  const handlePress = () => {
    router.push(href);
  };

  const getColor = () => {
    if (isSelected) {
      return colors.primary[400];
    }

    return isDark ? colors.neutral[400] : colors.neutral[500];
  };

  return (
    <Pressable
      disabled
      withoutFeedback
      className="items-center gap-1.5"
      onPress={handlePress}
    >
      <Icon color={getColor()} name={icon} strokeWidth={1.7} />

      <Text className="font-inter text-xs" style={{ color: getColor() }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarItem;
