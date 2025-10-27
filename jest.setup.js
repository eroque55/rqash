jest.mock('react-native-keyboard-controller', () => ({
  KeyboardController: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dismiss: jest.fn(),
  },
}));
