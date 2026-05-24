import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { LoginImg } from '@/assets/images';
import {
  Button,
  CheckboxField,
  DefaultContainer,
  Input,
} from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { LoginForm, LoginSchema } from '@/validation/login.validation';

export const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: 240,
  },
});

const Login = () => {
  const { login } = useAuth();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      requestRefresh: false,
    },
  });

  return (
    <DefaultContainer contentContainerClassName="grow items-center justify-center gap-8 p-6">
      <Image source={LoginImg} style={styles.image} />

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
          placeholder="E-mail"
        />

        <View className="w-full items-start gap-3">
          <Input
            isPassword
            control={control}
            label="Senha"
            name="password"
            placeholder="Senha"
          />

          <CheckboxField
            control={control}
            label="Manter-me conectado"
            name="requestRefresh"
          />
        </View>
      </Animated.View>

      <Button text="Entrar" onPress={handleSubmit(login)} />
    </DefaultContainer>
  );
};

export default Login;
