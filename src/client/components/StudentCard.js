import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteStudent, updateStudent} from '../store'; // Imported Thunk Creators

const defaultImg = "https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311131_1280.png"

class StudentCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      schoolId: ''
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
  }
  componentDidMount(){
    this.setState({schoolId: this.props.student.schoolId || ''}) //OR avoids null from database
  }
  handleDelete(event, id){
    event.preventDefault();
    this.props.destroy(id);
  }
  handleTransfer(event, studentId){
    event.preventDefault();
    const schoolId = event.target.value;
    this.setState({schoolId});
    this.props.update(studentId, {schoolId});
  }
  render(){
    const {student, schools} = this.props;
    const {id, firstName, lastName, imageUrl, gpa} = student;
    const {schoolId} = this.state;
    const {handleTransfer} = this;
    return (
      <div id={id}>
        <h2>{`${firstName} ${lastName}`}</h2>
        <img height='90' src={imageUrl || defaultImg} alt={`Image of ${firstName}`} />
        <p>{`GPA: ${gpa}`}</p>
        <form>
          <label htmlFor='school'>School: </label>
          <br/>
          <select name='schoolId' value={schoolId} onChange={(event) => handleTransfer(event, id)}>
            <option value=''>-- Select New School --</option>
            {
              schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
            }
          </select>
        </form>
        <form  onSubmit={(event) => this.handleDelete(event, id)}>
          <input type='submit' value='Delete'/>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  schools: state.schools
});

const mapDispatchToProps = dispatch => ({
  destroy: studentId => dispatch(deleteStudent(studentId)),
  update: (studentId, studentUpdatesObj) => dispatch(updateStudent(studentId, studentUpdatesObj)),//
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);