import { createContext, useState } from 'react'

export const AppContext = createContext(null)

const initialValue = {
  name: '',
  surname: '',
  team_id: null,
  position_id: null,
  phone_number: '',
  email: '',
  token: '',
  laptop_name: '',
  laptop_image: '',
  laptop_brand_id: null,
  laptop_cpu: '',
  laptop_cpu_cores: null,
  laptop_cpu_threads: null,
  laptop_ram: null,
  laptop_hard_drive_type: '',
  laptop_purchase_date: '',
  laptop_price: null
}

export const ContextProvider = ({ children }) => {
  const [data, seData] = useState(initialValue)


  const addNewData =  (newData) => {
    seData(prevState => {
      return { ...prevState, ...newData }
    })
  }

  return <AppContext.Provider
     value={{addNewData, data }}>{children}</AppContext.Provider>
}
