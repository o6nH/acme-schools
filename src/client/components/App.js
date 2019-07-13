import React, {Component}  from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Schools from './Schools'
import Students from './Students'
import {fetchSchools, fetchStudents, getTopSchool, getPopSchool} from '../store';

class App extends Component {
  componentDidMount(){
    this.props.getSchools();
    this.props.getStudents();
  };
  render(){
    const {schools, students, schoolCount, studentCount, topSchool, popSchool} = this.props;
    return(
      <HashRouter>
        <h1>Hello from APP</h1>
        <Route path='/' render={() => <Navbar schoolCount={schoolCount} studentCount={studentCount} topSchool={topSchool} popSchool={popSchool}/>}/>
        <Route exact path='/' render={() => <Home topSchool={topSchool} popSchool={popSchool}/>}/>
        {/* <Route path='/' component={StudentForm}/> */}
        <Route exact path='/schools' render={() => <Schools schools={schools}/>}/>
        <Route exact path='/students' render={() => <Students students={students}/>}/>
        {/* <Route path='/schools/id' component={Students}/> */}
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => {
  const {schools, students} = state;
  return {
    schools,
    students,
    schoolCount: schools.length, 
    studentCount: students.length,
    topSchool: getTopSchool(schools, students),//{}
    popSchool: getPopSchool(schools, students)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(fetchSchools()),
  getStudents: () => dispatch(fetchStudents())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)