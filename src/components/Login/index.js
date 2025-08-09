import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', iserr: false, errname: ''}

  changeusername = event => {
    this.setState({username: event.target.value})
  }

  changepassword = event => {
    this.setState({password: event.target.value})
  }

  submitsuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitfailure = message => {
    this.setState({iserr: true, errname: message})
  }

  onsubmitform = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userdetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitsuccess(data.jwt_token)
    } else {
      this.submitfailure(data.error_msg)
    }
  }

  render() {
    const jwttoken = Cookies.get('jwt_token')
    if (jwttoken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, iserr, errname} = this.state
    return (
      <div className="back">
        <div className="container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form type="submit" onSubmit={this.onsubmitform}>
            <div className="inpcontainer">
              <label htmlFor="username" className="user">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="inp"
                value={username}
                onChange={this.changeusername}
              />
            </div>
            <div className="inpcontainer">
              <label htmlFor="password" className="user">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="inp"
                value={password}
                onChange={this.changepassword}
              />
            </div>
            <button className="btn" type="submit">
              Login
            </button>
            {iserr && <p>{errname}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
