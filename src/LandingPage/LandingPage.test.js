import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'

import LandingPage from './LandingPage'

describe('LandingPage', async () => {
  it('should have a greeting', async () => {
    const { getByText } = render(<LandingPage />)

    const topGreeting = await waitFor(() => getByText('Hey there!'))
    const bottomGreeting = await waitFor(() => getByText('What\'s your name?'))
    
    expect(topGreeting).toHaveTextContent('Hey there!')
    expect(bottomGreeting).toHaveTextContent('What\'s your name?')
  });
});