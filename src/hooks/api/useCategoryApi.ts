import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { categoryService } from '@/services/api/category';
import { TCategory } from '@/types/category';

export const useListCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: categoryService.list,
    select: data => {
      const parsedCategories: TCategory[] = data.map(item => ({
        id: item.id,
        name: item.name,
        iconUrl: item.icon_url,
        colorHex: item.color_hex,
      }));

      return parsedCategories;
    },
  });
};
