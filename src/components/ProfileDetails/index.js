import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apistatusconstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
class ProfileDetails extends Component {
  state = {profiledata: [], apistatus: apistatusconstants.initial}

  componentDidMount() {
    this.getprofile()
  }

  getprofile = async () => {
    this.setState({apistatus: apistatusconstants.inprogress})
    const jwttoken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwttoken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedata = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apistatus: apistatusconstants.success,
        profiledata: updatedata,
      })
    } else {
      this.setState({apistatus: apistatusconstants.failure})
    }
  }

  renderprofileview = () => {
    const {profiledata} = this.state
    const {name, profileImageUrl, shortBio} = profiledata
    return (
      <div className="profilecont">
        <img src={profileImageUrl} alt="profile" className="profileimg" />
        <h1 className="phead">{name}</h1>
        <p className="ppara">{shortBio}</p>
      </div>
    )
  }

  renderfailureview = () => (
    <div className="profilefail">
      <button className="pbtn" onClick={this.getprofile} id="button">
        Retry
      </button>
    </div>
  )

  renderloader = () => (
    <div className="profileload" data-testid="loader" id="Loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusconstants.success:
        return this.renderprofileview()
      case apistatusconstants.failure:
        return this.renderfailureview()
      case apistatusconstants.inprogress:
        return this.renderloader()
      default:
        return null
    }
  }
}
export default ProfileDetails
