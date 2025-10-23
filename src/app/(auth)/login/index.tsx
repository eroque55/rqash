import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { LoginImg } from '@/assets/images';
import { Button, Image, Input, KeyboardAwareScrollView } from '@/components/ui';
import CheckboxField from '@/components/ui/CheckboxField';
import { useAuth } from '@/contexts/useAuth';
import { useTheme } from '@/hooks/common/useTheme';
import { LoginForm, LoginSchema } from '@/validation/login.validation';

const Login = () => {
  const { login, logout } = useAuth();
  const { toggleTheme } = useTheme();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    logout();
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerClassName="flex-grow items-center justify-center gap-8 p-6">
      <Image
        className="aspect-square w-60"
        containerProps={{ layout: LinearTransition }}
        source={LoginImg}
      />

      <View className="w-full gap-1">
        <Text className="font-inter_medium text-2xl text-neutral-800 dark:text-neutral-100">
          Bem vindo!
        </Text>

        <Text className="font-inter text-lg text-neutral-500 dark:text-neutral-400">
          Insira seus dados para continuar
        </Text>
      </View>

      <Input
        control={control}
        keyboardType="email-address"
        label="E-mail"
        name="identifier"
        placeholder="E-mail"
      />

      <Animated.View
        className="w-full items-start gap-3"
        layout={LinearTransition}
      >
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
      </Animated.View>

      <Button text="Entrar" onPress={handleSubmit(login)} />

      <Text
        className="absolute bottom-4 font-inter_medium text-xs text-neutral-600 dark:text-neutral-300"
        onPress={toggleTheme}
      >
        toggle theme
      </Text>
    </KeyboardAwareScrollView>
  );
};

export default Login;
