import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createAuthSession} from '../store'; //Import of Thunk Creator

const initState = {
  email: '',
  password: ''
};

class Login extends Component {
  constructor(props){
    super(props);
    this.state = initState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  //Event Handlers (with Error Handling for Form Specific Data)
  handleChange(event){
    let isDisabled;
    let {name, value} = event.target;
    const {email, password} = this.state;
    switch (name) {
      case 'email':
        isDisabled = !(value && password);
        break;
      case 'password':
        isDisabled = !(email && value);
        break;
      default:
        isDisabled = !(email && password);
        break;
    }
    
    this.setState({[name]:value, isDisabled})
  };
          
  handleSubmit(event){
    event.preventDefault();
    const {submitForm} = this.props;
    submitForm({...this.state});
    this.setState(initState);
  };

  render() {
    const {handleChange, handleSubmit} = this;
    const {email, password, isDisabled} = this.state;
    return (
      <div className='container'>
        <h2 className="display-4 text-center">Login</h2>
        <form id='login-form' onSubmit={handleSubmit}>
          <div className='form-group d-flex-column m-auto'>
            <label htmlFor='email'>Email:</label>
            <input className='form-control'
              placeholder='Enter email (hcampos@acme.edu)'
              required 
              name='email' 
              type='email' 
              value={email} 
              onChange={handleChange}/>
            <label htmlFor='password'>Password:</label>
            <input className='form-control'
              placeholder='Enter password (password123)'
              required 
              name='password' 
              type='password' 
              value={password} 
              onChange={handleChange}/>
              <div className='d-flex justify-content-center'>
                <br/>
                <button className={(isDisabled===undefined || isDisabled===true) ? 'btn btn-outline-primary' : 'btn btn-primary'} disabled={isDisabled} type='submit'>Login</button>
              </div>
          </div>
        </form>
      </div>
    )
  };
};

// Mappings from Redux Store to Component Props
const mapStateToProps = (state) => ({
  authUserId: state.authUserId
});

const mapDispatchToProps = (dispatch) => ({
  submitForm: (loginForm) => {
    const credentials = {...loginForm};
    delete credentials.isDisabled; //isDisabled was added onChanges and deleted for thunk creator
    dispatch(createAuthSession(credentials));
  }
});

// Export of Store-Connected Container Component
export default connect(mapStateToProps, mapDispatchToProps)(Login);