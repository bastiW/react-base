import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import TestWrapper from './TestWrapper';
import userEvent from '@testing-library/user-event';

describe('App.tsx', () => {
  const setup = () => {
    const renderer = render(
      <TestWrapper>
        <App />
      </TestWrapper>,
    );

    const domElements = {
      countUpButton: () => renderer.findByText('Count UP!'),
      count: () => renderer.findByTestId('count'),
    };

    return {
      ...renderer,
      ...domElements,
    };
  };

  type TestWrapper = ReturnType<typeof setup>;

  let tw: TestWrapper;

  beforeEach(() => {
    tw = setup();
  });

  it('should display the count initially with 0', async () => {
    expect(await tw.count()).toHaveTextContent('0');
  });

  describe('Count UP Button', () => {
    it('should be present', async () => {
      expect(await tw.countUpButton()).toBeInTheDocument();
    });

    it('should increase the count when clicking on it', async () => {
      const countUpButton = await tw.countUpButton();
      userEvent.click(countUpButton);
      expect(await tw.count()).toHaveTextContent('1');
    });
  });
});
