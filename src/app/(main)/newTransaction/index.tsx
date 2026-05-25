import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import CategoriesList from '@/components/pages/main/newTransaction/CategoriesList';
import NewTransactionInput from '@/components/pages/main/newTransaction/NewTransactionInput';
import { Button, DefaultContainer } from '@/components/ui';
import Tab from '@/components/ui/Tab';
import { colors } from '@/global/colors';
import { useDefaultModal } from '@/store/defaultModalStore';
import {
  NewTransactionForm,
  NewTransactionSchema,
} from '@/validation/newTransaction.validation';

const NewTransaction = () => {
  const router = useRouter();
  const { openModal } = useDefaultModal();

  const { control, setValue, watch, handleSubmit } =
    useForm<NewTransactionForm>({
      resolver: zodResolver(NewTransactionSchema),
      defaultValues: {
        type: 'expense',
        amount: '0',
        description: '',
        date: '',
        category: '',
      },
    });

  const { type } = watch();

  const onSubmit = (data: NewTransactionForm) => {
    console.log('----------------------data----------------------');
    console.log(JSON.stringify(data, null, 2));
    console.log('----------------------data----------------------');

    openModal({
      title: 'Transação salva',
      message: 'Sua transação foi salva com sucesso.',
      confirmText: 'OK',
      onConfirm: () => router.back(),
    });
  };

  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-6">
      <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
        Nova transação
      </Text>

      <View className="grow flex-row items-center gap-3">
        <Tab
          activeBackgroundColor={colors.alert.error}
          containerStyle={{ flexGrow: 1 }}
          isActive={type === 'expense'}
          text="Despesa"
          onPress={() => setValue('type', 'expense')}
        />

        <Tab
          activeBackgroundColor={colors.alert.success}
          containerStyle={{ flexGrow: 1 }}
          isActive={type === 'income'}
          text="Receita"
          onPress={() => setValue('type', 'income')}
        />
      </View>

      <NewTransactionInput
        isValue
        control={control}
        keyboardType="numeric"
        label="Valor (R$)"
        maxLength={10}
        name="amount"
        options={{
          unit: '',
        }}
        placeholder="0,00"
        type="money"
      />

      <NewTransactionInput
        autoCapitalize="sentences"
        control={control}
        label="Descrição"
        maxLength={50}
        name="description"
        placeholder="Digite a descrição"
      />

      <NewTransactionInput
        control={control}
        label="Data"
        maxLength={10}
        name="date"
        options={{
          format: 'DD/MM/YYYY',
        }}
        placeholder="dd/mm/yyyy"
        type="datetime"
      />

      <Text className="font-inter_medium text-xs text-neutral-600 dark:text-neutral-300">
        Categoria
      </Text>

      <CategoriesList control={control} name="category" />

      <Button text="Salvar transação" onPress={handleSubmit(onSubmit)} />
    </DefaultContainer>
  );
};

export default NewTransaction;
