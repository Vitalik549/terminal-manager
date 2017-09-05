import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch('ADD_GROUP', ownProps);
        }
    }
};

const AppContainer = connect(
    mapDispatchToProps
)(App);

export default AppContainer