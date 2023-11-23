import {Component} from 'react'
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
  state = {eachCourse: {}, apiStatus: ApiStatusConstants.initial}

  componentDidMount() {
    this.getEachCourseDetails()
  }

  getEachCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: ApiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        eachCourse: updatedData,
        apiStatus: ApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: ApiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {eachCourse} = this.state
    const {name, imageUrl, description} = eachCourse
    return (
      <div className="successView-container">
        <div className="card">
          <img src={imageUrl} alt={name} className="course-image" />
          <div>
            <h1 className="name">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
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
        onClick={() => this.getEachCourseDetails()}
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
