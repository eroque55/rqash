jest.mock('react-native-keyboard-controller', () => ({
  KeyboardController: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dismiss: jest.fn(),
  },
}));

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);

jest.mock('react-native-mmkv', () => {
  const storageMap = new Map();

  const mmkvMock = {
    set: jest.fn((key, value) => storageMap.set(key, value)),
    getString: jest.fn(key => storageMap.get(key)),
    getBoolean: jest.fn(key => storageMap.get(key)),
    getNumber: jest.fn(key => storageMap.get(key)),
    delete: jest.fn(key => storageMap.delete(key)),
    contains: jest.fn(key => storageMap.has(key)),
    clearAll: jest.fn(() => storageMap.clear()),
    getAllKeys: jest.fn(() => Array.from(storageMap.keys())),
  };

  return {
    MMKV: jest.fn(() => mmkvMock),
    createMMKV: jest.fn(() => mmkvMock),
  };
});
