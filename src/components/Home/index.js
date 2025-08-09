import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home">
      <div className="title">
        <h1 className="homehead">Find The Job That Fits Your Life</h1>
        <p className="text">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits for your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="btn">Find Jobs</button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
