import '@/global/global.css';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultModal } from '@/components/ui';
import { AuthProvider } from '@/contexts/useAuth';
import { colors } from '@/global/colors';
import { useDimensions, useUpdate } from '@/hooks/common';
import { useTheme } from '@/hooks/common/useTheme';
import { useDefaultModal } from '@/store/defaultModalStore';
import { handleError } from '@/utils/handleError';

export { ErrorBoundary } from '@/components/ui/ErrorBoundary';

setDefaultOptions({ locale: ptBR });

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { isFirstCheck } = useUpdate();
  const { insets } = useDimensions();
  const { isDark } = useTheme();
  const { openModal } = useDefaultModal();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const isAppReady = !isFirstCheck && fontsLoaded;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000,
        retry: false,
        initialDataUpdatedAt: 0,
      },
      mutations: {
        onError: error =>
          openModal({
            title: 'Ops!',
            message: handleError(error),
            confirmText: 'Fechar',
          }),
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.invalidateQueries) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidateQueries,
          });
        }
      },
    }),
  });

  if (!isAppReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <SafeAreaProvider>
            <AuthProvider isAppReady={isAppReady}>
              <StatusBar style="auto" />

              <Stack
                screenOptions={{
                  animation: 'fade',
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: isDark
                      ? colors.neutral[900]
                      : colors.lightBackground,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                  },
                }}
              />

              <DefaultModal />
            </AuthProvider>
          </SafeAreaProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
