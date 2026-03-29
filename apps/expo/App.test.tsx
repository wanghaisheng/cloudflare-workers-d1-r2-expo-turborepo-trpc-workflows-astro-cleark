import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';

// Simple test component
const TestComponent = () => {
  return (
    <View testID="test-component">
      <Text testID="test-text">Hello Expo Test</Text>
      <Text testID="test-description">This is a test component</Text>
    </View>
  );
};

describe('Expo App Tests', () => {
  it('should render test component', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('test-component')).toBeTruthy();
    expect(screen.getByTestId('test-text')).toBeTruthy();
    expect(screen.getByTestId('test-description')).toBeTruthy();
  });

  it('should display correct text content', () => {
    render(<TestComponent />);
    
    expect(screen.getByText('Hello Expo Test')).toBeTruthy();
    expect(screen.getByText('This is a test component')).toBeTruthy();
  });

  it('should handle mock navigation', () => {
    const mockNavigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    expect(mockNavigation.navigate).toBeDefined();
    expect(mockNavigation.goBack).toBeDefined();
  });

  it('should handle mock tRPC client', () => {
    const mockTrpc = {
      user: {
        getProfile: jest.fn(),
        updateProfile: jest.fn(),
      },
    };

    expect(mockTrpc.user.getProfile).toBeDefined();
    expect(mockTrpc.user.updateProfile).toBeDefined();
  });

  it('should handle async operations', async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue({ data: 'test' });
    
    const result = await mockAsyncFunction();
    
    expect(mockAsyncFunction).toHaveBeenCalled();
    expect(result).toEqual({ data: 'test' });
  });
});
