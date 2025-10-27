/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import { Button } from '@/components/ui';
import { colors } from '@/global/colors';

jest.mock('@/hooks/common', () => ({
  useDisableDelay: jest.fn(() => ({
    executeWithDelay: jest.fn(cb => cb()),
    isLoading: false,
  })),
}));

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização básica', () => {
    it('deve renderizar o botão com texto', () => {
      render(<Button text="Clique aqui" />);
      expect(screen.getByText('Clique aqui')).toBeTruthy();
    });

    it('deve renderizar sem texto quando text não é fornecido', () => {
      render(<Button />);
      expect(screen.getByText('')).toBeTruthy();
    });

    it('deve aplicar a largura padrão de 100%', () => {
      render(<Button testID="botao" text="Botão" />);
      const button = screen.getByTestId('botao');
      expect(button.props.style).toContainEqual(
        expect.objectContaining({ width: '100%' }),
      );
    });

    it('deve aplicar largura customizada', () => {
      render(<Button testID="botao" text="Botão" width="50%" />);
      const button = screen.getByTestId('botao');
      expect(button.props.style).toContainEqual(
        expect.objectContaining({ width: '50%' }),
      );
    });
  });

  describe('Estilos e cores', () => {
    it('deve aplicar cor primária por padrão', () => {
      render(<Button testID="botao" text="Botão" />);
      const button = screen.getByTestId('botao');
      expect(button.props.style).toContainEqual(
        expect.objectContaining({ backgroundColor: colors.primary }),
      );
    });

    it('deve aplicar cor customizada', () => {
      const customColor = '#FF0000';
      render(<Button color={customColor} testID="botao" text="Botão" />);
      const button = screen.getByTestId('botao');
      expect(button.props.style).toContainEqual(
        expect.objectContaining({ backgroundColor: customColor }),
      );
    });

    it('deve aplicar estilo wired (sem background, com borda)', () => {
      const customColor = '#FF0000';
      render(<Button wired color={customColor} testID="botao" text="Botão" />);
      const button = screen.getByTestId('botao');
      expect(button.props.style).toContainEqual(
        expect.objectContaining({
          backgroundColor: undefined,
          borderColor: customColor,
        }),
      );
    });

    it('deve aplicar cor de texto branca quando não é wired', () => {
      render(<Button text="Botão" />);
      const text = screen.getByText('Botão');
      expect(text.props.style).toEqual(
        expect.objectContaining({ color: colors.neutral[100] }),
      );
    });

    it('deve aplicar cor de texto customizada quando é wired', () => {
      const customColor = '#FF0000';
      render(<Button wired color={customColor} text="Botão" />);
      const text = screen.getByText('Botão');
      expect(text.props.style).toEqual(
        expect.objectContaining({ color: customColor }),
      );
    });

    it('deve aplicar estilos customizados via prop style', () => {
      const customStyle = { marginTop: 20 };
      render(<Button style={customStyle} testID="botao" text="Botão" />);
      const button = screen.getByTestId('botao');
      expect(button.props.style).toContainEqual(customStyle);
    });
  });

  describe('Comportamento de clique', () => {
    it('deve chamar onPress quando clicado', () => {
      const onPressMock = jest.fn();
      render(<Button text="Botão" onPress={onPressMock} />);

      fireEvent.press(screen.getByText('Botão'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('não deve causar erro quando onPress não é fornecido', () => {
      render(<Button text="Botão" />);
      expect(() => fireEvent.press(screen.getByText('Botão'))).not.toThrow();
    });

    it('deve executar onPress com delay por padrão', async () => {
      const { useDisableDelay } = require('@/hooks/common');
      const executeWithDelayMock = jest.fn(cb => cb());
      useDisableDelay.mockReturnValue({
        executeWithDelay: executeWithDelayMock,
        isLoading: false,
      });

      const onPressMock = jest.fn();
      render(<Button text="Botão" onPress={onPressMock} />);

      fireEvent.press(screen.getByText('Botão'));

      await waitFor(() => {
        expect(executeWithDelayMock).toHaveBeenCalled();
        expect(onPressMock).toHaveBeenCalled();
      });
    });

    it('deve executar onPress sem delay quando withoutDelay é true', () => {
      const onPressMock = jest.fn();
      render(
        <Button
          withoutDelay
          testID="botao"
          text="Botão"
          onPress={onPressMock}
        />,
      );

      fireEvent.press(screen.getByTestId('botao'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estados de loading', () => {
    it('deve mostrar indicador de loading quando isLoading é true', () => {
      render(<Button isLoading text="Botão" />);
      expect(screen.getByTestId('button-activity-indicator')).toBeTruthy();
    });

    it('deve mostrar indicador quando hook retorna loading', () => {
      const { useDisableDelay } = require('@/hooks/common');
      useDisableDelay.mockReturnValue({
        executeWithDelay: jest.fn(),
        isLoading: true,
      });

      render(<Button text="Botão" />);
      expect(screen.getByTestId('button-activity-indicator')).toBeTruthy();
    });

    it('não deve mostrar indicador quando não está loading', () => {
      render(<Button text="Botão" />);
      expect(screen.queryByTestId('button-activity-indicator')).toBeNull();
    });
  });

  describe('Props adicionais', () => {
    it('deve aceitar e aplicar props do Pressable', () => {
      const onLongPressMock = jest.fn();
      render(<Button text="Botão" onLongPress={onLongPressMock} />);

      fireEvent(screen.getByText('Botão'), 'longPress');
      expect(onLongPressMock).toHaveBeenCalled();
    });

    it('deve aceitar testID', () => {
      render(<Button testID="custom-button" text="Botão" />);
      expect(screen.getByTestId('custom-button')).toBeTruthy();
    });

    it('deve aceitar disabled', () => {
      const onPressMock = jest.fn();
      render(
        <Button disabled testID="botao" text="Botão" onPress={onPressMock} />,
      );

      const button = screen.getByTestId('botao');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });
});
