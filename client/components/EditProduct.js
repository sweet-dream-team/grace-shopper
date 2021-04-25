
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct, editSingleProductThunk} from '../store/singleProduct'

class EditProduct extends Component {
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

componentDidMount(){
    this.props.getAProduct(this.props.match.params.productId)
}

componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        productName: this.props.product.productName || 'TBD',
        description: this.props.product.description || '',
        unitPrice: this.props.product.unitPrice || 1099,
      });
    }
  }

handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.editProduct(this.props.match.params.productId, { ...this.state });
    this.props.history.push('/admin')
  }
    render() {
    
    console.log('in the render')
    const {product} = this.props
    console.log('props: ', this.props)
        return (
            <div>
                    {!this.props.product ?
     (<h1> LO A D I N G...</h1>)
     :
     ( 
            <div>
        <h1>Whaddyou need to change? </h1>

       <form id='product-form' onSubmit={this.handleSubmit}>

        <label htmlFor='productName'>New Dream Name?</label><br/><br/>
        <input name='productName' onChange={this.handleChange} placeholder={product.productName}/> <br/><br/>

        <label htmlFor='description'>New Description?</label><br/><br/>
        <input name='description' onChange={this.handleChange} placeholder={product.description} /><br/><br/>
        
        <label htmlFor= 'unitPrice'>Price Change?</label><br/><br/>
        <input name='unitPrice' onChange={this.handleChange}  placeholder={product.unitPrice} /><br/><br/>


        <button type='submit' className='submitbutton'>Submit</button><br/>
        <br/><Link to='/'>Nevermind!</Link>

      </form> 
      </div> 
        )
    }
      </div>
        )
}
}

const mapStateToProps = (state) => {
    return {
        product: state.singleProduct
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getAProduct : (id) => dispatch(getSingleProduct(id)),
        editProduct : (id, info) => dispatch(editSingleProductThunk(id, info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
