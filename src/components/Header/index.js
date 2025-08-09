import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const Header = props => {
  const onlogoutbtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header">
      <div className="desktopdevice">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logos"
          />
        </Link>
        <ul className="listcontainer">
          <li className="item">
            <Link to="/" className="navlink">
              Home
            </Link>
          </li>
          <li className="item">
            <Link to="/jobs" className="navlink">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="btn" onClick={onlogoutbtn}>
          Logout
        </button>
      </div>
      <div className="mobiledevice">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logos"
          />
        </Link>
        <ul className="listscontainer">
          <li>
            <Link to="/">
              <AiFillHome className="navitem" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsFillBriefcaseFill className="navitem" />
            </Link>
          </li>
          <button className="imbtn" onClick={onlogoutbtn}>
            <FiLogOut />
          </button>
        </ul>
      </div>
    </div>
  )
}
export default withRouter(Header)
