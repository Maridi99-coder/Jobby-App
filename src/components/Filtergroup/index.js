import {BsSearch} from 'react-icons/bs'
import './index.css'
import ProfileDetails from '../ProfileDetails'

const Filtergroup = props => {
  const onchangesearchinput = event => {
    const {changesearchinput} = props
    changesearchinput(event)
  }
  const onenter = event => {
    const {getjobs} = props
    if (event.key === 'Enter') {
      getjobs()
    }
  }
  const rendersearchinput = () => {
    const {getjobs, searchinput} = props
    return (
      <div className="inputdesktopfil">
        <input
          type="search"
          className="searchfil"
          placeholder="Search"
          onChange={onchangesearchinput}
          onKeyDown={onenter}
          value={searchinput}
        />
        <button
          onClick={getjobs}
          data-testid="searchButton"
          className="btns"
          type="button"
        >
          <BsSearch className="searchicon" />
        </button>
      </div>
    )
  }
  const rendertypesofemployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="etcont">
        <h1 className="ethead">Type of Employment</h1>
        <ul className="etlistcont">
          {employmentTypesList.map(eachemployee => {
            const {changeemplyeeslist} = props
            const selectemployeetype = event => {
              changeemplyeeslist(event.target.value)
            }
            return (
              <li
                className="item"
                key={eachemployee.employmentTypeId}
                onChange={selectemployeetype}
              >
                <input
                  type="checkbox"
                  id={eachemployee.employmentTypeId}
                  value={eachemployee.employmentTypeId}
                  className="checkbox"
                />
                <label
                  htmlFor={eachemployee.employmentTypeId}
                  className="label"
                >
                  {eachemployee.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  const rendersalaryranges = () => {
    const {salaryRangesList} = props
    return (
      <div className="etcont">
        <h1 className="ethead">Salary Range</h1>
        <ul className="etlistcont">
          {salaryRangesList.map(eachsalary => {
            const {changesalary} = props
            const selectsalarytype = () => {
              changesalary(eachsalary.salaryRangeId)
            }
            return (
              <li
                className="item"
                key={eachsalary.salaryRangeId}
                onChange={selectsalarytype}
              >
                <input
                  type="radio"
                  id={eachsalary.salaryRangeId}
                  value={eachsalary.salaryRangeId}
                  name="salary"
                  className="checkbox"
                />
                <label htmlFor={eachsalary.salaryRangeId} className="label">
                  {eachsalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className="filtergrpcont">
      {rendersearchinput()}
      <ProfileDetails />
      <hr className="hl" />
      {rendertypesofemployment()}
      <hr className="hl" />
      {rendersalaryranges()}
    </div>
  )
}
export default Filtergroup
