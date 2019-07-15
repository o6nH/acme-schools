import React, {Component}  from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Schools from './Schools';
import Students from './Students';
import StudentForm from './StudentForm';
import {fetchSchools, fetchStudents, getTopSchool, getPopSchool} from '../store';

class App extends Component {
  componentDidMount(){
    this.props.getSchools();
    this.props.getStudents();
  };
  render(){
    const {schools, schoolCount, studentCount, topSchool, popSchool} = this.props;
    return(
      <HashRouter>
        {/* To prevent both the calculations of topSchool and popSchool from happening in multiple components and the storage of top schools and popular schools in the store, this component will pass down stats to both the Navbar and Home components using the render prop for Route*/}
        <Route path='/' render={() => <Navbar schoolCount={schoolCount} studentCount={studentCount} topSchool={topSchool} popSchool={popSchool}/>}/>
        <Route path='/' component={StudentForm}/>
        <Route exact path='/' render={() => <Home topSchool={topSchool} popSchool={popSchool}/>}/>
        <Route exact path='/schools' component={Schools}/> 
        {/* TODO pass down schools with appended student data */}
        <Route exact path='/students' component={Students}/>
        <Route path='/schools/:id' component={Students}/>
      </HashRouter>
    )
  }
}

// Mappings from Redux's State Store to React Component
const mapStateToProps = (state) => {
  const {schools, students} = state;
  return {
    schools,
    schoolCount: schools.length, 
    studentCount: students.length,
    topSchool: getTopSchool(schools, students),
    popSchool: getPopSchool(schools, students)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(fetchSchools()),
  getStudents: () => dispatch(fetchStudents())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)