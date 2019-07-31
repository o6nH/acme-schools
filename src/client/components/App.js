import React, {Component}  from 'react';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Schools from './Schools';
import Students from './Students';
import StudentsBySchool from './StudentsBySchool';
import StudentForm from './StudentForm';
import Login from './Login'
import {fetchAuthUser, deleteSession, fetchSchools, fetchStudents, getTopSchool, getPopSchool} from '../store';

// Component
class App extends Component {
  componentDidMount(){
    this.props.getUserId();
    this.props.getSchools();
    this.props.getStudents();
  };

  componentDidUpdate(prevProps) {
    if(this.props.authUserId && this.props.authUserId !== prevProps.authUserId) {
      this.props.getSchools();
      this.props.getStudents();
    }
  };

  render(){
    const {authUserId, deleteUserId, schoolCount, studentCount, topSchool, popSchool} = this.props;
    return(
      <HashRouter>
        {/* To prevent both the calculations of topSchool and popSchool from happening in multiple components and the storage of top schools and popular schools in the store, this component will pass down stats to both the Navbar and Home components using the render prop for Route*/}
        <Route path='/' render={() => <Navbar schoolCount={schoolCount} studentCount={studentCount} topSchool={topSchool} popSchool={popSchool} authUserId={authUserId} deleteUserId={deleteUserId}/>}/>
        <Route exact path='/' render={() => <Home topSchool={topSchool} popSchool={popSchool}/>}/>
        <Route exact path='/login' component={Login} />
        {
          !authUserId
          ? <Redirect to='/login' />
          : <Switch>
              <Route exact path='/' component={StudentForm}/>
              <Route exact path='/schools' component={Schools}/>
              <Route exact path='/students' component={Students}/>
              <Route path='/schools/:id' component={StudentsBySchool}/>
              <Redirect to='/' />
            </Switch>
        }
      </HashRouter>
    )
  }
};

// Mappings from Redux's State Store to React Component
const mapStateToProps = (state) => {
  const {authUserId, schools, students} = state;
  return {
    authUserId,
    schoolCount: schools.length, 
    studentCount: students.length,
    topSchool: getTopSchool(schools, students),
    popSchool: getPopSchool(schools, students)
  }
};

const mapDispatchToProps = (dispatch) => ({
  getUserId: () => dispatch(fetchAuthUser()),
  deleteUserId: () => dispatch(deleteSession()),
  getSchools: () => dispatch(fetchSchools()),
  getStudents: () => dispatch(fetchStudents())
});

// Export of Container Component Connected to App Component
export default connect(mapStateToProps, mapDispatchToProps)(App);