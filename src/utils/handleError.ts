/* eslint-disable no-console */
import type { AxiosError } from 'axios';
import axios from 'axios';

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
};

const handleCustomErrors = (error: AxiosError<ApiErrorResponse>): string => {
  const errorMessage =
    error.response?.data?.error?.message || error.response?.data?.message;

  if (!errorMessage || typeof errorMessage !== 'string') {
    return 'Houve um imprevisto, tente novamente mais tarde';
  }

  if (errorMessage.includes('Too many requests, please try again later.')) {
    return 'Muitas requisições, tente mais tarde.';
  }

  if (errorMessage.includes('Your new password must be different')) {
    return 'Sua nova senha deve ser diferente da senha atual.';
  }

  if (
    errorMessage.includes('Passwords do not match') ||
    errorMessage.includes('The provided current password')
  ) {
    return 'Senha atual inválida';
  }

  if (errorMessage.includes('Invalid identifier or password')) {
    return 'Dados inválidos';
  }

  return errorMessage;
};

export const handleError = (
  err: AxiosError | string | Error | unknown,
): string => {
  console.log('----------------------error----------------------');
  console.log(JSON.stringify(err, null, 2));
  console.log('----------------------error----------------------');

  if (axios.isAxiosError(err)) {
    return handleCustomErrors(err);
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return 'Houve um imprevisto, tente novamente mais tarde';
};
