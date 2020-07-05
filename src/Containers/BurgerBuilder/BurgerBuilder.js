import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component{
	state={
		purchasing:false
	}
	componentDidMount(){
		this.props.onInitIngredients();
	}
	updatePurchase(ingredients){
		const sum=Object.keys(ingredients)
			.map(igkey=>{
				return ingredients[igkey];
			})
			.reduce((sum,el)=>{
				return sum+el;
			},0);
		return sum>0;
	}	
	purchaseHandler=()=>{
		if(this.props.isAuthenticated){
			this.setState({purchasing:true});
		}else{
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
		
	}
	purchaseCancelHandler=()=>{
		this.setState({purchasing:false});
	}
	purchaseContinueHandler=()=>{
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}
	render(){
		const disabledInfo={
			...this.props.ings
		};
		for(let key in disabledInfo){
			disabledInfo[key]=disabledInfo[key]<=0;
		}
		let orderSummary=null;
		let burger=this.props.error?<p>Ingredients cant be loaded</p>:<Spinner/>;
		if(this.props.ings){
			burger=(
				<Auxiliary>
					<Burger 
					ingredients={this.props.ings}/>
					<BuildControls
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={this.updatePurchase(this.props.ings)}
					ordered={this.purchaseHandler}
					isAuth={this.props.isAuthenticated}
					price={this.props.price}/>
				</Auxiliary>
			);
			orderSummary=<OrderSummary 
						price={this.props.price}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}
						ingredients={this.props.ings}/>;
		}
		
		return(
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps=state=>{
	return {
		ings:state.burgerBuilder.ingredients,
		price:state.burgerBuilder.total_price,
		error:state.burgerBuilder.error,
		isAuthenticated:state.auth.token!==null
	};
};

const mapDispatchToProps=dispatch=>{
	return{
		onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
		onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
		onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));