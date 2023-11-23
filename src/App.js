import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Courses from './components/Courses/index'
import EachCourse from './components/EachCourse/index'
import NotFound from './components/NotFound/index'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={EachCourse} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
