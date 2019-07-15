import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteStudent} from '../store'; // Imported Thunk Creators

const defaultImg = "https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311131_1280.png"

class StudentCard extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event, id){
    event.preventDefault();
    this.props.destroy(id);
  }
  render(){
    const {student, schools} = this.props;
    const {id, firstName, lastName, imageUrl, gpa, schoolId} = student;
    return (
      <div>
        <h2>{`${firstName} ${lastName}`}</h2>
        <img height='90' src={imageUrl || defaultImg} alt={`Image of ${firstName}`} />
        <p>{`GPA: ${gpa}`}</p>
        <form>
          <label htmlFor='school'>School: </label>
          <br/>
          <select name='school' defaultValue={schoolId}>
            <option value=''>-- Select New School --</option>
            {
              schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
            }
          </select>
        </form>
        <form  onSubmit={(event) => this.handleSubmit(event, id)}>
          <input type='submit' value='Delete'/>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  schools:state.schools
});

const mapDispatchToProps = dispatch => ({
  destroy: studentId => dispatch(deleteStudent(studentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);