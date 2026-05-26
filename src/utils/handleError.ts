import { AuthError, PostgrestError } from '@supabase/supabase-js';

const handleCustomErrors = (message: string): string => {
  if (message.includes('Invalid login credentials')) {
    return 'Credenciais de login inválidas';
  }

  if (message.includes('User already registered')) {
    return 'E-mail já cadastrado';
  }

  return message;
};

export const handleError = (
  error: AuthError | PostgrestError | string | Error | unknown,
): string => {
  console.log('----------------------error----------------------');
  console.log(JSON.stringify(error, null, 2));
  console.log('----------------------error----------------------');

  let errorMessage = 'Houve um imprevisto, tente novamente mais tarde';

  if (typeof error === 'string') {
    errorMessage = error;
  }

  const { message } = error as { message?: string };

  if (message) {
    errorMessage = message;
  }

  return handleCustomErrors(errorMessage);
};
