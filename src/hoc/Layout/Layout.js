import React,{Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
	state={
		showSideDrawer:true
	}
	sideDrawerClosedHandler=()=>{
		this.setState({showSideDrawer:false});
	}
	sideDrawerToggleHandler=()=>{
		this.setState((prevState)=>{
			return{showSideDrawer:!prevState.showSideDrawer};
		});
	}
	render(){
		return (
			<Auxiliary>
				<Toolbar 
				isAuth={this.props.isAuthenticated} 
				drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer 
				isAuth={this.props.isAuthenticated} 
				open={this.state.showSideDrawer} 
				closed={this.sideDrawerClosedHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxiliary>
		)
	}
} 

const mapStateToProps=state=>{
	return{
		isAuthenticated:state.auth.token!==null
	};
};

export default connect(mapStateToProps)(Layout);