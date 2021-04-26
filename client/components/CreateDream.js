import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDreamThunk } from '../store/products';
import {Link} from 'react-router-dom'

class CreateDream extends Component {
 constructor(props) {
    super(props);
    this.state = {
      productName: 'TBD',
      description: '',
      unitPrice: 1099,
        };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.makeADream({ ...this.state });
    this.setState({
      productName: 'TBD',
      description: '',
      unitPrice: 1099,
    });
    this.props.history.push('/admin')
  }

  render() {
    return (
      <div>
        <h2> Time to make D R E A M S come alive!</h2>
       <form id='robot-form' onSubmit={this.handleSubmit}>

        <label htmlFor='productName'>Dream Name:</label><br/><br/>
        <input name='productName' onChange={this.handleChange} placeholder="name" /> <br/><br/>

        <label htmlFor='description'>Description:</label><br/><br/>
        <input name='description' onChange={this.handleChange}  placeholder='description' /><br/><br/>
        
        <label htmlFor= 'unitPrice'>How Much?</label><br/><br/>
        <input name='unitPrice' onChange={this.handleChange} placeholder="price" /><br/><br/>


        <button type='submit' className='submitbutton'>Submit</button><br/>
        <br/><Link to='/admin'>Nevermind!</Link>
        
      </form> 
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeADream: (dream) => {
      dispatch(createDreamThunk(dream))
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateDream);