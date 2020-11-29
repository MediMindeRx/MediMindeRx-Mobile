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

  it('should have an input field and a button', async () => {
    const { findByPlaceholderText, findByText } = render(<LandingPage />)

    const input = await waitFor(() => findByPlaceholderText('Name'))
    const button = await waitFor(() => findByText('Create Reminder'))

    expect(input).toBeEmpty("");
    expect(button).toHaveTextContent("Create Reminder")
  })

  it('input field should be changeable', async () => {
    const { getByPlaceholderText } = render(<LandingPage />)

    const input = await waitFor(() => getByPlaceholderText('Name'))

    fireEvent.changeText(input, "Samuel")

    expect(input).toHaveTextContent("Samuel")
  })

  it('input field should be reset after button press', async () => {
    const { getByText, getByPlaceholderText } = render(<LandingPage />)

    const input = await waitFor(() => getByPlaceholderText('Name'))
    const button = await waitFor(() => getByText("Create Reminder"))

    fireEvent.changeText(input, "Samuel")

    expect(input).toHaveTextContent("Samuel")

    fireEvent.click(button)

    expect(input).toHaveTextContent("")
  })
});
