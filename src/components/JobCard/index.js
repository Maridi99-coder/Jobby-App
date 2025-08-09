import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobdata} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobdata
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobitem">
        <div className="logocontainer">
          <div className="logocont">
            <img src={companyLogoUrl} alt="company logo" className="logo" />
            <div className="titlecont">
              <h1 className="title">{title}</h1>
              <div className="rating">
                <BsStarFill className="ratingicon" />
                <p className="rate">{rating}</p>
              </div>
            </div>
          </div>
          <div className="pakagecont">
            <div className="leftcont">
              <div className="locationcont">
                <MdLocationOn className="locicon" />
                <p className="lpara">{location}</p>
              </div>
              <div className="pakagecont">
                <BsFillBriefcaseFill className="briefcase" />
                <p className="lpara">{employmentType}</p>
              </div>
            </div>
            <p className="lpara">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <h1 className="dhead">Description</h1>
        <p className="dpara">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
