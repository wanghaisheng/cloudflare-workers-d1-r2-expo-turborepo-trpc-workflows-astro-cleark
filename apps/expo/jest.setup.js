import 'react-native-gesture-handler/jestSetup';

// Mock expo modules
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('expo-constants', () => ({
  default: {},
}));

jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
  parse: jest.fn(),
}));

jest.mock('expo-symbols', () => ({
  Symbol: jest.fn(),
}));

// Mock tRPC
jest.mock('@acme/trpc', () => ({
  trpc: {
    createTRPCReact: jest.fn(() => ({
      utils: {
        client: {
          query: jest.fn(),
          mutation: jest.fn(),
        },
      },
    })),
  },
}));
