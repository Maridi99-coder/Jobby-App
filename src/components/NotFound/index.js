import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="notcont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="nimg"
      />
      <h1 className="nhead">Page Not Found</h1>
      <p className="npara">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
