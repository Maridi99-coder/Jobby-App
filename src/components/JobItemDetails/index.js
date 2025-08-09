import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import SkillCard from '../SkillCard'
import SimilarJob from '../SimilarJob'
import Header from '../Header'
import './index.css'

const apistatusconstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobdata: [],
    similarjobdata: [],
    apistatus: apistatusconstants.initial,
  }

  componentDidMount() {
    this.getjobdata()
  }

  getformatdata = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachskill => ({
      imageUrl: eachskill.image_url,
      name: eachskill.name,
    })),
  })

  getsimilarjobdata = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getjobdata = async () => {
    this.setState({apistatus: apistatusconstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwttoken = Cookies.get('jwt_token')
    const apiurl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwttoken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedata = this.getformatdata(data.job_details)
      const updatesimilardata = data.similar_jobs.map(similar =>
        this.getsimilarjobdata(similar),
      )
      this.setState({
        jobdata: updatedata,
        apistatus: apistatusconstants.success,
        similarjobdata: updatesimilardata,
      })
    } else {
      this.setState({apistatus: apistatusconstants.failure})
    }
  }

  getjobsuccess = () => {
    const {jobdata, similarjobdata} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobdata
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="jobdetails">
        <div className="jobitem">
          <div className="headcont">
            <div className="logocont">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="companylogo"
              />
              <div className="titlecont">
                <h1 className="title">{title}</h1>
                <div className="ratingcont">
                  <BsStarFill className="ratingicon" />
                  <p className="ratehead">{rating}</p>
                </div>
              </div>
            </div>
            <div className="lprcont">
              <div className="lpcont">
                <div className="lcont">
                  <MdLocationOn className="licon" />
                  <p className="lpara">{location}</p>
                </div>
                <div className="lcont">
                  <BsFillBriefcaseFill className="licon" />
                  <p className="lpara">{employmentType}</p>
                </div>
              </div>
              <p className="packagehead">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="dvcont">
            <h1 className="des">Description</h1>
            <div className="vcont">
              <a href={companyWebsiteUrl} className="vhead">
                Visit
              </a>
              <BiLinkExternal className="visiticon" />
            </div>
          </div>
          <p className="destext">{jobDescription}</p>
          <h1 className="shead">Skills</h1>
          <ul className="skillcont">
            {skills.map(eachskill => (
              <SkillCard skilldetails={eachskill} key={eachskill.name} />
            ))}
          </ul>
          <h1 className="lihead">Life at Company</h1>
          <div className="lifecont">
            <p className="lpara">{description}</p>
            <img src={imageUrl} alt="life at company" className="lifeimg" />
          </div>
        </div>
        <h1 className="shead">Similar Jobs</h1>
        <ul className="similarlist">
          {similarjobdata.map(eachsimilar => (
            <SimilarJob similarjobdetails={eachsimilar} key={eachsimilar.id} />
          ))}
        </ul>
      </div>
    )
  }

  getjobfailure = () => (
    <div className="failcont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureimg"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getjobdata} className="fbtn">
        Retry
      </button>
    </div>
  )

  getloader = () => (
    <div data-testid="loader" className="jobloader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderjobdetails = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusconstants.success:
        return this.getjobsuccess()
      case apistatusconstants.failure:
        return this.getjobfailure()
      case apistatusconstants.inprogress:
        return this.getloader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobitemdetailcont">{this.renderjobdetails()}</div>
      </>
    )
  }
}
export default JobItemDetails
