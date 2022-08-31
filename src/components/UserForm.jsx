import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/app.context";
import { geoRegEx, emailRegEx, phoneNumberRegEx } from '../utils/index'


export const UserForm = () => {
  const initialState = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    team_id: '',
    position: '',
    token: process.env.REACT_APP_TOKEN
  }
  const url = process.env.REACT_APP_URL
  const { toggleActive, addNewData } = useContext(AppContext)
  const [teamName, setTeamName] = useState('')
  const [positionName, setPositionName] = useState('')
  const [filteredPositionOptions, setFilteredPositionOptions] = useState([])
  const [userForm, setUserForm] = useState(initialState)
  const [params, setParams] = useState({})
  const { name, surname, email, phone_number } = userForm

  const handleChange = (e) => {
    const value = e.target.value;

    setUserForm({
      ...userForm,
      [e.target.name]: value.trim()
    });

  }

  const addUser = (e) => {
    e.preventDefault()
    try {
      if (!geoRegEx.test(userForm.name)) throw new Error('not georgian')
      if (!geoRegEx.test(userForm.surname)) throw new Error('not georgian')
      if (!emailRegEx.test(userForm.email)) throw new Error('not valid email')
      if (!phoneNumberRegEx.test(userForm.phone_number)) throw new Error('not valid phone number')
      if (typeof userForm.team_id !== "number") throw new Error('Please select option')
      if (typeof userForm.position !== "number") throw new Error('Please select options')

      addNewData(userForm)
      toggleActive()
    } catch (e) {
      console.log(e)
    }
  }

  const getTeamValue = async () => {
    const { data: team } = await axios(`${url}/teams`)
    const { data: position } = await axios(`${url}/positions`)

    setParams(getParams(team, position))
  }

  const getParams = (team, position) => {
    const teamObj = {}
    for (let i = 0; i < team.data.length; i++) {
      teamObj[team.data[i].id] = { id: team.data[i].id, name: team.data[i].name }
    }
    for (let i = 0; i < position.data.length; i++) {
      if (!teamObj[position.data[i].team_id].hasOwnProperty('position')) {
        teamObj[position.data[i].team_id] = {
          ...teamObj[position.data[i].team_id],
          position: [position.data[i]]
        }
      } else {
        teamObj[position.data[i].team_id].position.push(position.data[i])
      }
    }
    const teamArray = []
    for (let id in teamObj) {
      teamArray.push(teamObj[id])
    }

    return [teamArray]
  }


  useEffect(() => {

    getTeamValue()
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { teamName, positionName } = user
      setTeamName(teamName)
      setPositionName(positionName)
      setUserForm(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({
      ...userForm,
      teamName,
      positionName,
    }))
  }, [userForm, teamName, positionName])


  const selectedTeam = (e) => {
    const { value } = e.target
    if (value === "თიმი") {
      return setTeamName(value)
    }
    const filteredValue = params[0].filter(option => option.name === value)
    setUserForm({ ...userForm, team_id: filteredValue[0].id })
    setTeamName(value)
    setFilteredPositionOptions(filteredValue[0].position)

  }

  const selectPosition = (e) => {
    const { value } = e.target;
    if (value === 'პოზიცია' && teamName !== 'თიმი') {
      return setPositionName(value)
    }
    const filteredValue = filteredPositionOptions.filter(option => option.name === value)
    setPositionName(value)
    setUserForm({
      ...userForm,
      position: filteredValue[0].id
    })

  }

  return (
     <>
       <form onSubmit={addUser}>
         {/*min 2 only georgian*/}
         <label>სახელი</label>
         <input type="text" name="name" value={name} onChange={handleChange}/>
         {/*min 2 only georgian*/}
         <label>გვარი</label>
         <input type="text" name="surname" value={surname} onChange={handleChange}/>


         <select value={teamName} onChange={selectedTeam}>
           <option>თიმი</option>
           {params[0]?.map((param) => <option key={param.id} value={param?.name}>{param?.name}</option>)}
         </select>

         <select value={positionName} onChange={selectPosition}>
           <option>{positionName ? `${positionName}` : 'პოზიცია'}</option>
           {filteredPositionOptions?.map((position) => <option key={position.id}
                                                               value={position?.name}>{position?.name}</option>)}
         < /select>

         {/*must end with @redberry.ge*/}
         <label>მეილი</label>
         <input type='email' value={email} name='email' onChange={handleChange}/>
         {/*+995 ... ... */}
         <label>ტელეფონის ნომერი</label>
         <input type="text" value={phone_number} name='phone_number' onChange={handleChange}/>
         <button type="submit">Next</button>
       </form>
     </>
  )
}