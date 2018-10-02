import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_DATA, UPDATE_INPUT, SHOW_MODAL, CLOSE_MODAL } from "../constants/ActionTypes";
import Modal from 'react-modal';

class Fetchdata extends Component {
  
  componentDidMount = () => {
    // tutaj jakis wewnetrzny state, zeby nie odpalac za kazdym mountowaniem?
      this.props.handleSubmit();
  }

  render() {
    const dataToMap = this.props.flights || {}
    const modalData = this.props.flights.filter(el => {
      return el.launch_year === this.props.value
  })
  console.log(modalData)
    return (
      <div>
        <input type="text"
               onChange={this.props.handleInputChange}
               value={this.props.value}/>
        <div>   
        {dataToMap.filter(el => {
              return el.launch_year === this.props.value
          }).map((el, index) => {
              return <div onClick={()=> this.props.displayModal(index)}>
                        {el.mission_name}
                    </div>
          })}
          </div>
          <Modal
          isOpen={this.props.showModal}
          contentLabel="Example Modal"
          onRequestClose={this.props.closeModal}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
        >
          <div>
          {this.props.showModal ? 
          <div>
            <h2>{modalData[this.props.indexModal].mission_name}</h2>
            <img src={modalData[this.props.indexModal].links.mission_patch}
                 alt="" />
          </div>
            :
            <h2>showmodal is false</h2>
          } 
          </div>
        </Modal>   
      </div>
    );
  }
}


export const mapStateToProps = store => {
  return {
    flights: store.fetchdata.flights,
    value: store.fetchdata.value,
    showModal: store.fetchdata.showModal,
    closeModal: store.fetchdata.showModal,
    indexModal: store.fetchdata.indexModal
  };
}; 

export const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: () => {
      fetch("https://api.spacexdata.com/v2/launches")
      .then(resp => resp.json())
      .then(data => dispatch({type: FETCH_DATA, payload: data })) 
    },
    handleInputChange: e => {
      dispatch({type: UPDATE_INPUT, payload: e.target.value})
    },
    displayModal: (index) => {
      const action = {type: SHOW_MODAL, payload: index}
      dispatch(action)
    },
    closeModal: () => {
      const action = {type: CLOSE_MODAL}
      dispatch(action)
    }
  };
};

const customStyles = {
  content : {
    top                   : "50%",
    left                  : "50%",
    right                 : "auto",
    bottom                : "auto",
    marginRight           : "-50%",
    paddingTop            : "-20%",
    transform             : "translate(-50%, -50%)"
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetchdata);
