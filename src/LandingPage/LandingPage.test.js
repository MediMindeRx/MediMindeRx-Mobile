import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native' 

import LandingPage from './LandingPage'

jest.useFakeTimers()

describe('LandingPage', () => {
  it('should have a greeting', () => {
    const {
      getByTestId,
      getByText, 
      queryByTestId, 
      toJSON 
    } = render(<LandingPage />)

    const header = getByText('Hey there! What\'s your name?')
    
    expect(header).toBeInTheDocument()
  });
});