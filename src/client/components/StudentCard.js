import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteStudent, updateStudent} from '../store'; // Imported Thunk Creators

const defaultStudentImg = "https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311131_1280.png"
const defaultSchoolImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Go-home.svg/200px-Go-home.svg.png"

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
    this.setState({schoolId: this.props.student.schoolId || ''}) 
    //The `OR` here avoids `null`s (from database) for React
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
    const school = schools.find(school => school.id === schoolId) || {imageUrl:''};
    const {handleTransfer} = this;
    
    return (
      <div className='card d-flex align-items-center' id={id}>
        <h3 className='card-title display-5 text-center'>{`${firstName} ${lastName}`}</h3>
        <div>
        <img className='card-img-top' src={imageUrl || defaultStudentImg} alt={`Image of ${firstName}`} />
        <img className='card-img-top' src={school.imageUrl || defaultSchoolImg} alt={`Image of ${firstName}`} />
        </div>
        <div className='card-body d-flex-column align-items-center text-center'>
        <p>{`ID: ${id.split('-')[4]}`}</p>
        <p>{`GPA: ${gpa}`}</p>
        <form>
          <label htmlFor='school'>School on File: </label>
          <br/>
          <select name='schoolId' value={schoolId} onChange={(event) => handleTransfer(event, id)}>
            {
              schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
            }
            <option value=''>None</option>
            {/* Set value='' in order to avoid default behavior of injecting innert text as value when value={null}. (i.e., value={null} => value='Unenroll'), but needed to add Sequelize `beforeValidate` Hook to set schoolId = null*/}
          </select>
        </form>
        <hr/>
        <form  onSubmit={event => this.handleDelete(event, id)}>
          <input className='btn btn-danger' type='submit' value='Delete'/>
        </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  schools: state.schools
});

const mapDispatchToProps = dispatch => ({
  destroy: studentId => dispatch(deleteStudent(studentId)),
  update: (studentId, studentUpdatesObj) => dispatch(updateStudent(studentId, studentUpdatesObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);