import './index.css'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJob = props => {
  const {similarjobdetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarjobdetails
  return (
    <li className="similaritem">
      <div className="logoscont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="simliarlogo"
        />
        <div className="titlescont">
          <h1 className="title">{title}</h1>
          <div className="ratecont">
            <BsStarFill className="rateicon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="deshead">Description</h1>
      <p className="destext">{jobDescription}</p>
      <div className="bcont">
        <div className="lcont">
          <MdLocationOn className="loicon" />
          <p className="lhead">{location}</p>
        </div>
        <div className="lcont">
          <BsFillBriefcaseFill className="licon" />
          <p className="lhead">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob
