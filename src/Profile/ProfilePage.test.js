import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'

import ProfilePage from './ProfilePage'

describe('LandingPage', async () => {
  it('should have a greeting', async () => {
    const route = {params: {
      name: '',
      id: '',
      reminders: [],
      currentReminder: {
        title: '',
        supplies: [],
        id: '',
        showSupplies: false,
        scheduled: {
          days: [],
          time: '',
          unixDate: '',
          repeating: false,
        },
        location: {
          lat: '',
          long: '',
          locationName: '',
          address: '',
        }
      }
    }
  }
  const navigation = {};
    const { getByText } = render(<ProfilePage />)

    const reminders = await waitFor(() => getByText("Let's schedule some reminders."))

    expext(reminders).not.toBeEmpty()
  });
})
