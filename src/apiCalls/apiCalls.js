const apiURL = 'http://127.0.0.1/5000/api'

export const getAllRemindersAPI = async () => {
  try {
    const response = await fetch(`${apiURL}/Reminder`)
    const data = response.json()
    return data 
  } catch (err) {
    return err
  }
}

export const deleteReminderAPI = async (reminderID) => {
  try {
    const response = await fetch(`${apiURL}/Reminder`, {
      method: 'DELETE',
      headers: {
          "Accept": "application/json",
          "Content-Type": 'multipart/form-data'
        },
        body: JSON.stringify(reminderID)
    })
    return response
  } catch (err) {
    return err
  }
}

export const addUserAPI = async (userName) => {
  try {
    const response = await fetch(`${apiURL}/User`, {
      method: "POST",
       headers: {
          "Accept": "application/json",
          "Content-Type": 'application/json'
        },
      body: JSON.stringify(userName)
    })
    return response
  } catch (error) {
    return error
  }
}

export const createReminderAPI = async (reminder) => {
  try {
    const response = await fetch(`${apiURL}/Reminder`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reminder)
    })
    return response
  } catch (error) {
    return error
  }
}

export const addReminderTypeAPI = async (reminder) => {
  try {
    const response = await fetch(`${apiURL}/Reminder`, {
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