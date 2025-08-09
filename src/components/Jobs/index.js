import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import './index.css'
import Filtergroup from '../Filtergroup'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apistatusconstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    searchinput: '',
    jobslist: [],
    apistatus: apistatusconstants.initial,
    employeetype: [],
    minsalary: 0,
  }

  componentDidMount() {
    this.getjobs()
  }

  getjobs = async () => {
    this.setState({apistatus: apistatusconstants.inprogress})
    const {employeetype, minsalary, searchinput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = `https://apis.ccbp.in/jobs?employment_type=${employeetype.join()}&minimum_package=${minsalary}&search=${searchinput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiurl, options)
    if (response.ok === true) {
      const fetchdata = await response.json()
      const updatedata = fetchdata.jobs.map(eachjob => ({
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        id: eachjob.id,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        packagePerAnnum: eachjob.package_per_annum,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      this.setState({
        jobslist: updatedata,
        apistatus: apistatusconstants.success,
      })
    } else {
      this.setState({apistatus: apistatusconstants.failure})
    }
  }

  changesearchinput = event => {
    this.setState({searchinput: event.target.value})
  }

  onenter = event => {
    if (event.key === 'Enter') {
      this.getjobs()
    }
  }

  changesalary = salary => {
    this.setState({minsalary: salary}, this.getjobs)
  }

  changeemplyeeslist = type => {
    this.setState(
      prevstate => ({employeetype: [...prevstate.employeetype, type]}),
      this.getjobs,
    )
  }

  renderjobs = () => {
    const {jobslist} = this.state
    const isrender = jobslist.length > 0
    return isrender ? (
      <div className="joblistcont">
        <ul className="joblist">
          {jobslist.map(each => (
            <JobCard jobdata={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="nojobview">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobimg"
        />
        <h1 className="nojobhead">No Jobs Found</h1>
        <p className="nojobpara">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderfailure = () => (
    <div className="failureview">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failimg"
      />
      <h1 className="failhead">Oops! Something Went Wrong</h1>
      <p className="failpara">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failbtn" data-testid="button" onClick={this.getjobs}>
        Retry
      </button>
    </div>
  )

  renderloader = () => (
    <div className="Loadercontainer" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getalljobs = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusconstants.success:
        return this.renderjobs()
      case apistatusconstants.failure:
        return this.renderfailure()
      case apistatusconstants.inprogress:
        return this.renderloader()
      default:
        return null
    }
  }

  render() {
    const {searchinput} = this.state
    return (
      <>
        <Header />
        <div className="jobscontainer">
          <div className="jobscontent">
            <Filtergroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changesearchinput={this.changesearchinput}
              searchinput={searchinput}
              getjobs={this.getjobs}
              changesalary={this.changesalary}
              changeemplyeeslist={this.changeemplyeeslist}
            />
            <div className="searchinputjobs">
              <div className="inputdesktop">
                <input
                  type="search"
                  className="search"
                  placeholder="Search"
                  onChange={this.changesearchinput}
                  onKeyDown={this.onenter}
                />
                <button
                  type="button"
                  onClick={this.getjobs}
                  data-testid="searchButton"
                  className="btns"
                >
                  <BsSearch className="searchicon" />
                </button>
              </div>
              {this.getalljobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
