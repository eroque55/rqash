/* eslint-disable no-console */
import { AuthError, PostgrestError } from '@supabase/supabase-js';

const handleCustomErrors = (error: AuthError | PostgrestError): string => {
  const { message } = error;

  console.log('----------------------message----------------------');
  console.log(JSON.stringify(message, null, 2));
  console.log('----------------------message----------------------');
  if (message.includes('Invalid login credentials')) {
    return 'Credenciais de login inválidas';
  }

  return message;
};

export const handleError = (
  error: AuthError | PostgrestError | string | Error | unknown,
): string => {
  if (error instanceof AuthError || error instanceof PostgrestError) {
    return handleCustomErrors(error);
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Houve um imprevisto, tente novamente mais tarde';
};
