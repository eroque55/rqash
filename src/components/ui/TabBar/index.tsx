import { View } from 'react-native';

import { colors } from '@/global/colors';

import Icon from '../Icon';
import Pressable from '../Pressable';

import TabBarItem from './TabBarItem';

const TabBar = () => {
  return (
    <View className="w-full flex-row items-end justify-between gap-3 border-t border-neutral-200 bg-white px-6 py-3 dark:border-neutral-600 dark:bg-neutral-800">
      <TabBarItem href="/(main)/home" icon="HomeIcon" label="Início" />

      <TabBarItem icon="ArrowsHorizontalIcon" label="Transações" />

      <Pressable className="-mx-1 -mt-8 mb-2 size-16 items-center justify-center overflow-hidden rounded-full bg-primary-500">
        <Icon color={colors.white} name="PlusIcon" strokeWidth={2.5} />
      </Pressable>

      <TabBarItem icon="GridIcon" label="Categorias" />

      <TabBarItem href="/(main)/profile" icon="UserIcon" label="Perfil" />
    </View>
  );
};

export default TabBar;
