import {useContext, useState, useEffect} from "react";
import axios from "axios";
import {AppContext} from "../../context/app.context";
import {geoRegEx, emailRegEx, phoneNumberRegEx} from '../../utils'
import {useNavigate} from "react-router-dom";
import styles from './UserForm.module.css'
import BackButton from "../../components/BackButton/BackButton";
import Logo from '../../components/Logo1/Logo'
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

export const UserForm = () => {
  const initialState = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    team_id: '',
    position_id: '',
    token: process.env.REACT_APP_TOKEN
  }
  const url = process.env.REACT_APP_URL
  const { addNewData } = useContext(AppContext)
  const [teamName, setTeamName] = useState('')
  const [positionName, setPositionName] = useState('')
  const [filteredPositionOptions, setFilteredPositionOptions] = useState([])
  const [userForm, setUserForm] = useState(initialState)
  const [errors, setErrors] = useState({
    nameError: false,
    surnameError: false,
    emailError: false,
    phone_numberError: false,
    teamError: false,
    positionError: false
  })
  const [params, setParams] = useState({})
  const { name, surname, email, phone_number } = userForm;
  const navigate = useNavigate()

  const handleChange = (data) => {
    const { name, value } = data
    if (name === "name") {
      errors.nameError = !geoRegEx.test(value) || value.length === 0;
    }
    if (name === "surname") {
      errors.surnameError = !geoRegEx.test(value) || value.length === 0;
    }
    if (name === "email") {
      console.log(userForm.email)
      errors.emailError = !emailRegEx.test(value) || value.length === 0;
    }
    if (name === "phone_number") {
      errors.phone_numberError = !phoneNumberRegEx.test(value) || value.length === 0;
    }
    setErrors(errors)
    localStorage.setItem('userErrors', JSON.stringify(errors))
    setUserForm({
      ...userForm,
      [name]: value.trim()
    });
  }

  const addUser = (e) => {
    e.preventDefault()
    if (!geoRegEx.test(userForm.name) || userForm.name.length === 0) {
      errors.nameError = true
    }
    if (!geoRegEx.test(userForm.surname) || userForm.surname.length === 0) {
      errors.surnameError = true
    }
    if (!emailRegEx.test(userForm.email) || userForm.email.length === 0) {
      errors.emailError = true
    }
    if (!phoneNumberRegEx.test(userForm.phone_number) || userForm.phone_number.length === 0) {
      errors.phone_numberError = true
    }
    if (typeof userForm.team_id !== "number" || userForm.teamID === -1) {
      errors.teamError = true
    }
    if (typeof userForm.position_id !== "number" || userForm.position_id === -1) {
      errors.positionError = true
    }
    if (typeof userForm.team_id === "string" && userForm.team_id.length === 0) {
      errors.teamError = true
    }
    if (typeof userForm.position_id === "string" && userForm.position_id.length === 0) {
      errors.positionError = true
    }
    localStorage.setItem('userErrors', JSON.stringify(errors))
    const errorsValues = Object.values(errors)
    setErrors(errors)
    let errorExists = false
    for (let i = 0; i < errorsValues.length; i++) {
      if (errorsValues[i]) {
        errorExists = true
        break;
      }
    }
    addNewData(userForm)
    if (errorExists) {
      return;
    }
    navigate('/laptop/create')
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
      if (!teamObj[position.data[i].team_id].hasOwnProperty('position_id')) {
        teamObj[position.data[i].team_id] = {
          ...teamObj[position.data[i].team_id],
          position_id: [position.data[i]]
        }
      } else {
        teamObj[position.data[i].team_id].position_id.push(position.data[i])
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
    const user = JSON.parse(localStorage.getItem('user'));
    const userErrors = JSON.parse(localStorage.getItem('userErrors'))
    if (userErrors) {
      setErrors(userErrors)
    } else {
      localStorage.setItem('userErrors', JSON.stringify(errors))
    }
    if (user) {
      const { teamName, positionName } = user
      setTeamName(teamName)
      setPositionName(positionName)
      setUserForm(user);
      addNewData(user)
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
    setErrors({
      ...errors,
      teamError: false
    })
    setFilteredPositionOptions(filteredValue[0].position_id)

  }

  const selectPosition = (e) => {
    const { value } = e.target;
    if (value === 'პოზიცია' && teamName !== 'თიმი') {
      return setPositionName(value)
    }
    const filteredValue = filteredPositionOptions.filter(option => option.name === value)
    setPositionName(value)
    setErrors({
      ...errors,
      positionError: false
    })
    setUserForm({
      ...userForm,
      position_id: filteredValue[0].id
    })
  }

  return (
      <div className={styles.userForm}>
        <BackButton onClick={() => navigate('/')}/>
        <div className={styles.nav}>
          <div><h3>თანამშრომლის ინფო</h3></div>
          <div className={styles.laptopHide}><h3>ლეპტოპის მახასიათებლები</h3></div>
          <h6 className={styles.pages}>1/2</h6>
        </div>
        <div className={styles.line}/>
        <div className={styles.form}>
          <form onSubmit={addUser}>
            <div className={styles.userInfo}>
              <Input
                  title="სახელი"
                  type="text"
                  name="name"
                  error={errors.nameError}
                  value={name}
                  placeholder="გრიშა"
                  onHandleChange={handleChange}
                  hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
                  top="0px"
                  left="0px"
              />
              <Input
                  title="გვარი"
                  type="text"
                  name="surname"
                  value={surname}
                  error={errors.surnameError}
                  placeholder="ბაგრატიონი"
                  onHandleChange={handleChange}
                  hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
                  top="0px"
                  left="550px"
              />
            </div>


            <div className={styles.team}>
              <select style={errors.teamError ? { border: "1.8px solid #E52F2F" } : {}}
                      className={styles.selectTeam} value={teamName} onChange={selectedTeam}>
                <option>თიმი</option>
                {params[0]?.map((param) => <option className={styles.selectTeams} key={param.id}
                                                   value={param?.name}>{param?.name}</option>)}
              </select>
            </div>

            <div className={styles.position}>
              <select style={errors.teamError ? { border: "1.8px solid #E52F2F" } : {}}
                      className={styles.selectPosition} value={positionName} onChange={selectPosition}>
                <option>{positionName ? `${positionName}` : 'პოზიცია'}</option>
                {filteredPositionOptions?.map((position) => <option className={styles.selectPositions}
                                                                    key={position.id}
                                                                    value={position?.name}>{position?.name}</option>)}
              < /select>
            </div>

            <Input
                title="მეილი"
                type="email"
                name="email"
                value={email}
                error={errors.emailError}
                placeholder="grisha666@redberry.ge"
                onHandleChange={handleChange}
                hint="უნდა მთავრდებოდეს @redberry.ge-ით"
                top="500px"
                left="150px"
                width="878px"
            />

            <Input
                title="ტელეფონის ნომერი"
                type="text"
                name="phone_number"
                value={phone_number}
                error={errors.phone_numberError}
                placeholder="+995 590 00 07 01"
                onHandleChange={handleChange}
                hint="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
                top="650px"
                left="150px"
                width="878px"
            />
            <Button top="809px" width="176px" left="875px">შემდეგი</Button>
          </form>
        </div>
        <Logo/>
      </div>
  )
}