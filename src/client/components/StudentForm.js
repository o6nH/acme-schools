import React, { Component } from 'react';
import {connect} from 'react-redux';

class StudentForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor='firstName'>First Name:</label><br/>
        <input name='firstName' type='text'/><br/>
        <label htmlFor='lastName'>Last Name:</label><br/>
        <input name='lastName' type='text'/><br/>
        <label htmlFor='Email'>Email:</label><br/>
        <input name='email' type='email'/><br/>
        <label htmlFor='gpa'>GPA:</label><br/>
        <input name='gpa' type='number' step='0.01' min='0' max='5'/><br/>
        <label htmlFor='school'>Enroll at:</label><br/>
        <select name='school'>
          {
            this.props.schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
          }
        </select>
        <br/>
        <input type='submit' value='Save'/>
      </form>
    )
  }
}

const mapStateToProp = (state) => ({
  schools: state.schools
});

export default connect(mapStateToProp)(StudentForm)