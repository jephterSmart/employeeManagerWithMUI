import React,{Component} from 'react';

import Backdrop from '../Backdrop/Backdrop';
import  classes  from './Modal.css';



class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children
    }
    render(){
        return ( 
            <>
               <div 
                   className={classes.Modal}
                   style={{transform:this.props.show? 'translateY(0)': 'translateY(-150vh)'}}>
                   {this.props.children}
               </div>
               {this.props.show ? <Backdrop clicked={this.props.removeBackdrop} /> : null}
            </>
               );
           
    }
}

export default Modal;