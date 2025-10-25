import { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui';
import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

const Decorator = ({ children }: PropsWithChildren) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <View
      className="flex-1 gap-6 p-6"
      style={{
        backgroundColor: isDark ? colors.neutral[900] : colors.lightBackground,
      }}
    >
      {children}

      <Button
        style={{ marginTop: 'auto' }}
        text="Toggle Theme"
        onPress={toggleTheme}
      />
    </View>
  );
};

export default Decorator;
