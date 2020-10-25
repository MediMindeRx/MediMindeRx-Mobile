const apiURL = ''

export const getAllReminders = async () => {
  try {
    const response = fetch(`${apiURL}`)
    const data = await response.json()
     return data 
  } catch (err) {
    return err
  }
}

export const deleteReminder = async (reminderID) => {
  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json",
        }
    })
    return response
  } catch (err) {
    return err
  }
}

export const addReminder = async (userID, reminder) => {
  try {
    const response = await fetch(`${apiURL}/${userID}/reminders`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reminder)
    })
    return response
  } catch (err) {
    return err
  }
}