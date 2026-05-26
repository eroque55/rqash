import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { LoginImg } from '@/assets/images';
import {
  Button,
  CheckboxField,
  DefaultContainer,
  Image,
  Input,
} from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { LoginForm, LoginSchema } from '@/validation/login.validation';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: __DEV__
      ? {
          email: 'edurss1000@gmail.com',
          password: 'Aa12345@',
          requestRefresh: false,
        }
      : {
          email: '',
          password: '',
          requestRefresh: false,
        },
  });

  return (
    <DefaultContainer contentContainerClassName="grow items-center justify-center gap-8 p-6">
      <Image className="aspect-square w-60" source={LoginImg} />

      <Animated.View className="w-full gap-1" layout={LinearTransition}>
        <Text className="font-inter_medium text-2xl text-neutral-800 dark:text-neutral-100">
          Bem vindo!
        </Text>

        <Text className="font-inter text-base text-neutral-500 dark:text-neutral-400">
          Insira seus dados para continuar
        </Text>
      </Animated.View>

      <Animated.View className="w-full gap-5" layout={LinearTransition}>
        <Input
          control={control}
          keyboardType="email-address"
          label="E-mail"
          name="email"
          placeholder="Insira seu e-mail"
        />

        <View className="w-full items-start gap-3">
          <Input
            isPassword
            control={control}
            label="Senha"
            name="password"
            placeholder="Insira sua senha"
          />

          <CheckboxField
            control={control}
            label="Manter-me conectado"
            name="requestRefresh"
          />
        </View>
      </Animated.View>

      <View className="w-full items-center gap-4">
        <Button text="Entrar" onPress={handleSubmit(login)} />

        <Text
          className="text-sm"
          onPress={() => router.replace('/(auth)/signUp')}
        >
          <Text className="font-inter text-neutral-600 dark:text-neutral-400">
            Não tem uma conta?
          </Text>

          <Text className="font-inter_bold text-primary-500"> Cadastre-se</Text>
        </Text>
      </View>
    </DefaultContainer>
  );
};

export default Login;
