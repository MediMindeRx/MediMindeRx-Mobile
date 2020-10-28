const apiURL = 'https://mediminderx-api.herokuapp.com/api/v1'

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
    const response = await fetch(`${apiURL}/reminders`, {
      method: 'DELETE',
      headers: {
          "Content-Type": 'application/json'
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
    const response = await fetch(`${apiURL}/users`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userName)
    })
    return response.json()
  } catch (error) {
    return error
  }
}

export const createReminderAPI = async (reminder) => {
  try {
    const response = await fetch(`${apiURL}/reminders`, {
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

const getLocationCoords = async (address) => {
  try {
    const response = await fetch(`https://api.radar.io/v1/geocode/forward?query=${address}`, {
      headers: {
        "Authorization": "prj_test_pk_c0e695398d2087846001855a18c471cabb8af286"
      }
    })
  } catch (error) {
    return
  }
}  