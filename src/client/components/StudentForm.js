import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../store'; //Import of Thunk Creator

// Initial Form State
const initState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: 0,
  schoolId: '',
  isDisabled: true
}

// Controlled Form Component
class StudentForm extends Component {
  //Constructor, Component State, Instance Method Bindings 
  constructor(props){
    super(props);
    this.state = initState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  };

  //Event Handlers (with Error Handling for Form Specific Data)
  handleChange(event){
    let isDisabled;
    let {name, value} = event.target;
    const {firstName, lastName, email} = this.state;
    switch (name) {
      case 'firstName':
        value = value ? value[0].toUpperCase()+value.slice(1) : '';
        isDisabled = this.isDisabled(value, lastName, email);
        break;
      case 'lastName':
        value = value ? value[0].toUpperCase()+value.slice(1) : '';
        isDisabled = this.isDisabled(firstName, value, email);
        break;
      case 'email':
        isDisabled = this.isDisabled(firstName, lastName, value);
        break;
      default:
        isDisabled = this.isDisabled(firstName, lastName, email);
        break;
    }
    
    this.setState({[name]:value, isDisabled})
  }
  
  isDisabled(firstName, lastName, email){
    return !(firstName && lastName && email);
  };
          
  handleSubmit(event){
    event.preventDefault();
    const {submitForm} = this.props;
    let {schoolId, gpa} = this.state;
    schoolId = (!schoolId) ? null: schoolId;
    gpa = (!schoolId && !gpa) ? null : gpa;
    submitForm({...this.state, schoolId, gpa});
    this.setState(initState);
  }

  //Form Component Render
  render() {
    const {firstName, lastName, email, gpa, schoolId, isDisabled} = this.state;
    const {handleChange, handleSubmit} = this;
    return (
      <div className='container'>
        <h2 className="display-4 text-center">New Students Form</h2>
        <form id='new-student-form' onSubmit={handleSubmit}>
          <div className='form-group d-flex-column m-auto'>
            <label htmlFor='firstName'>First Name:</label>
            <input className='form-control'
              placeholder='Enter first name'
              required 
              name='firstName' 
              type='text' 
              value={firstName} 
              onChange={handleChange} />
            <label htmlFor='lastName'>Last Name:</label>
            <input className='form-control'
              placeholder='Enter last name'
              required 
              name='lastName' 
              type='text' 
              value={lastName} 
              onChange={handleChange}/>
            <label htmlFor='Email'>Email:</label>
            <input className='form-control'
              placeholder='Enter email'
              required 
              name='email' 
              type='email' 
              value={email} 
              onChange={handleChange} />
            <label htmlFor='school'>School:</label>
            <select className='form-control'
              name='schoolId' 
              value={schoolId} 
              onChange={handleChange}>
              <option value=''>-- Please select a school (if applicable) --</option>
              {
                this.props.schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
              }
            </select>
            <label htmlFor='gpa'>GPA:</label>
            <input className='form-control'
              placeholder='Enter GPA'
              name='gpa' 
              type='number' 
              step='0.01' 
              min='0' 
              max='5'
              value={gpa} 
              onChange={handleChange}/>
              <div className='d-flex justify-content-center'>
                <br/>
                <button className={isDisabled ? 'btn btn-outline-primary' : 'btn btn-primary'} disabled={isDisabled} type='submit'>Save</button>
              </div>
          </div>
        </form>
      </div>
    )
  }
}

// Mappings from Redux Store to Component Props
const mapStateToProps = (state) => ({
  schools: state.schools
});

const mapDispatchToProps = (dispatch) => ({
  submitForm: (studentForm) => {
    const student = {...studentForm};
    delete student.isDisabled;
    dispatch(createStudent(student))
  }
})

// Export of Store-Connected Container Component
export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)