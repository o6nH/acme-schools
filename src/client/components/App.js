import React, {Component}  from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import {fetchSchools, fetchStudents, getTopSchool, getPopSchool} from '../store';

class App extends Component {
  componentDidMount(){
    this.props.getSchools();
    this.props.getStudents();
  };
  render(){
    return(
      <HashRouter>
        <h1>Hello from APP</h1>
        <Route path='/' render={() => <Navbar schoolCount={this.props.schoolCount} studentCount={this.props.studentCount} topSchool={this.props.topSchool} popSchool={this.props.popSchool}/>}/>
        <Route exact path='/' render={() => <Home/>}/>
        {/* <Route path='/' component={StudentForm}/>
        <Route exact path='/schools' component={Schools}/>
        <Route exact path='/students' component={Students}/>
        <Route path='/schools/id' component={Students}/> */}
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