import React,{Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler=(WrappedComponent,axios)=>{
	return class extends Component{
		state={
			error:null
		};
		errorConfirmHandler=()=>{
			this.setState({error:null});
		}
		componentWillMount(){
			this.reqInterceptor=axios.interceptors.request.use(request=>{
				this.setState({error:null});
				return request
			})
			this.resInterceptor=axios.interceptors.response.use(response=>response,error=>{
				this.setState({error:error});
			});
		}
		componentWillUnmount(){
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}
		render(){
			return (
				<Auxiliary>
					<Modal 
					show={this.state.error} 
					modalClosed={this.errorConfirmHandler}
					>{this.state.error?this.state.error.message:null}</Modal>
					<WrappedComponent {...this.props}/>
				</Auxiliary>
			);
		}
	}
};

export default withErrorHandler;