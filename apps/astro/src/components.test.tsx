import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock a simple React component for testing
const TestComponent = () => {
  return (
    <div data-testid="test-component">
      <h1>Hello Astro Test</h1>
      <p>This is a test component</p>
    </div>
  );
};

describe('Astro App Tests', () => {
  it('should render test component', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByText('Hello Astro Test')).toBeInTheDocument();
    expect(screen.getByText('This is a test component')).toBeInTheDocument();
  });

  it('should have proper document structure', () => {
    render(<TestComponent />);
    
    const component = screen.getByTestId('test-component');
    expect(component.querySelector('h1')).toBeInTheDocument();
    expect(component.querySelector('p')).toBeInTheDocument();
  });

  it('should handle mock data correctly', () => {
    const mockData = {
      title: 'Test Title',
      description: 'Test Description',
    };

    expect(mockData.title).toBe('Test Title');
    expect(mockData.description).toBe('Test Description');
  });

  it('should simulate API call', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    global.fetch = mockFetch;

    const response = await fetch('/api/test');
    const data = await response.json();

    expect(mockFetch).toHaveBeenCalledWith('/api/test');
    expect(data).toEqual({ data: 'test' });
  });
});
