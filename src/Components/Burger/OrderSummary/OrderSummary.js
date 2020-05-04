import React,{Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
	//This can also be a functional component
	render(){
		const ingredientSummary = Object.keys(this.props.ingredients)
		.map(igkey=>{
			return <li key={igkey}><span style={{textTransform:'capitalize'}} >{igkey}</span>: {this.props.ingredients[igkey]}</li>;
		});
		return(
			<Auxiliary>
				<h3>Your Order</h3>
				<p>A delicius burger with foloowing ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinue}>CONFIRM</Button>
			</Auxiliary>
		);
	}
};


export default OrderSummary;