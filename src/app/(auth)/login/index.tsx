import { zodResolver } from '@hookform/resolvers/zod';
import { updateId } from 'expo-updates';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Button, Input, Pressable } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { useTheme } from '@/hooks/common/useTheme';
import { LoginForm, LoginSchema } from '@/validation/login.validation';

const Login = () => {
  const { login, logout } = useAuth();
  const { toggleTheme } = useTheme();

  const [showUpdateId, setShowUpdateId] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    logout();
  }, []);

  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Input
        control={control}
        keyboardType="email-address"
        label="E-mail"
        name="identifier"
        placeholder="E-mail"
      />

      <Input
        isPassword
        control={control}
        label="Senha"
        name="password"
        placeholder="Senha"
      />

      <Button text="Entrar" onPress={handleSubmit(login)} />

      <Button wired text="Mudar Tema" onPress={toggleTheme} />

      <Pressable
        className="absolute bottom-8 h-4 w-full items-center justify-center"
        onPress={() => setShowUpdateId(!showUpdateId)}
      >
        {showUpdateId && (
          <Text className="text-xs text-neutral-500">{updateId}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default Login;
