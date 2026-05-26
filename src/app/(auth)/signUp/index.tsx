import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { LoginImg } from '@/assets/images';
import { Button, DefaultContainer, Image, Input } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { useCreateUser } from '@/hooks/api/useAuthApi';
import { SignUpForm, SignUpSchema } from '@/validation/signUp.validation';

const SignUp = () => {
  const router = useRouter();

  const { mutateAsync } = useCreateUser();
  const { fetchUser } = useAuth();

  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: __DEV__
      ? {
          name: 'Eduardo Roque',
          email: 'edurss1000@gmail.com',
          password: 'Aa12345@',
          confirmPassword: 'Aa12345@',
        }
      : {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
  });

  const onSubmit = async (form: SignUpForm) => {
    await mutateAsync(form);
    await fetchUser();

    router.replace('/(main)/home');
  };

  return (
    <DefaultContainer contentContainerClassName="grow items-center justify-center gap-8 p-6">
      <Image className="aspect-square w-60" source={LoginImg} />

      <Animated.View className="w-full gap-1" layout={LinearTransition}>
        <Text className="font-inter_medium text-2xl text-neutral-800 dark:text-neutral-100">
          Crie sua conta
        </Text>

        <Text className="font-inter text-base text-neutral-500 dark:text-neutral-400">
          Organize suas finanças com o RQash
        </Text>
      </Animated.View>

      <Animated.View className="w-full gap-5" layout={LinearTransition}>
        <Input
          autoCapitalize="words"
          control={control}
          label="Nome completo"
          name="name"
          placeholder="Insira seu nome"
        />

        <Input
          control={control}
          keyboardType="email-address"
          label="E-mail"
          name="email"
          placeholder="Insira seu e-mail"
        />

        <Input
          isPassword
          control={control}
          label="Senha"
          name="password"
          placeholder="Insira sua senha"
        />

        <Input
          isPassword
          control={control}
          label="Confirmar senha"
          name="confirmPassword"
          placeholder="Confirme sua senha"
        />
      </Animated.View>

      <View className="w-full items-center gap-4">
        <Button text="Cadastrar" onPress={handleSubmit(onSubmit)} />

        <Text
          className="text-sm"
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text className="font-inter text-neutral-600 dark:text-neutral-400">
            Já tem uma conta?
          </Text>

          <Text className="font-inter_bold text-primary-500"> Entrar</Text>
        </Text>
      </View>
    </DefaultContainer>
  );
};

export default SignUp;
