import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Navi = (props) => {//Calling it Navbar would throw error because of module name
  const {authUserId, deleteUserId} = props;
  const topSchool = props.topSchool || {id:'', name:'None', aveGPA:'N/A'};
  const popSchool = props.popSchool || {id: '', name:'None', students:[]};
  const {id:topId, name:topName, aveGPA:topGPA} = topSchool;
  const {id:popId, name:popName} = popSchool;
  const popCount = popSchool.students.length;

  return (
    <Navbar collapseOnSelect expand='lg' id='navbar' className='bg-primary navbar-dark'>
      <Navbar.Brand href='#/'><span role='image' arial-label='ACME Shools image'>🏫 ACME Schools</span></Navbar.Brand>
      <Navbar.Toggle className='mr' aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse className='mr-auto' id='responsive-navbar-nav'>
      <Nav className='ml-auto'>
        <Nav.Link href='#/'>Home</Nav.Link>
        {!!authUserId && <Nav.Link href='#/schools'>Schools ({`${props.schoolCount}`})</Nav.Link>}
        {!!authUserId && <Nav.Link href='#/students'>Students ({`${props.studentCount}`})</Nav.Link>}
        {
          authUserId && topId 
          ? <Nav.Link href={`#/schools/${topId}`}>Top School{` - ${topName} (GPA: ${topGPA})`}</Nav.Link>
          : ''
        }
        {
          authUserId && popId
          ? <Nav.Link href={`#/schools/${popId}`}>Most Popular School{` - ${popName} (${popCount})`}</Nav.Link>
          : ''
        }
        {
          authUserId
          ? <Nav.Link onClick={deleteUserId}>Logout</Nav.Link>
          : <Nav.Link href='#/login'>Login</Nav.Link>
        }
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
};

export default Navi;