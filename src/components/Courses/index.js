import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import './index.css'

const ApiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
  initial: 'INITIAL',
}

class Courses extends Component {
  state = {coursesList: [], apiStatus: ApiStatusConstants.initial}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: ApiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: ApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: ApiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="success-view-container">
        <h1 className="heading">Courses</h1>
        <ul className="courses-container">
          {coursesList.map(each => (
            <li key={each.id}>
              <Link to={`/courses/${each.id}`} className="each-course">
                <img src={each.logoUrl} alt={each.name} className="logo" />
                <p>{each.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={() => this.getCourseList()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case ApiStatusConstants.inProgress:
        return this.renderLoadingView()
      case ApiStatusConstants.success:
        return this.renderSuccessView()
      case ApiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="main-container">{this.renderView()}</div>
      </div>
    )
  }
}

export default Courses
