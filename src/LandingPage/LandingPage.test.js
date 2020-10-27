import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-dom'

import LandingPage from './LandingPage'

// jest.useFakeTimers()

describe('LandingPage', () => {
  it('should have a greeting', () => {
    const {
      getByTestId,
      findByText, 
      queryByTestId, 
      toJSON 
    } = render(<LandingPage />)

    const header = findByText('What\'s your name?')
    
    expect(header).toBeInTheDocument()
  });
});