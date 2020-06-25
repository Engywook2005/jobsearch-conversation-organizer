import styles from '../../../constants/styles';
import Ajax from '../../../http/ajax';
import ConvoList from './ConvoList.jsx';
import ConvoEdit from './ConvoEdit.jsx';
import React, { Component } from 'react';

class ConvoViews extends Component {

    // Only position ID prop.
    constructor(props) {
        super(props);

        // Passed on prop for all components that may be loaded on this page.
        this.passUpdateFunctions = {
            refreshList: this.resetConvos.bind(this),
            changeView: this.changeView.bind(this)
        };

        this.state = this.getInitState();
    }

    /**
     * Returns initial state for any time we need to refresh our view of the list.
     * @returns {{ready: boolean, convoArray: Array, currentView: string}}
     */
    getInitState() {
        return {
            ready: false, // Set to true when we have received convoArray
            viewData: [], // Specific data depends on view.
            currentView: 'list' // Which view to display.
        }
    }

    /**
     * Called by subcomponents when their data is updated and we want to go back to the conversation view.
     */
    resetConvos() {
        this.setState(this.getInitState());
    }

    /**
     * Called when needing to swap from one view to another.
     *
     * @param view
     * @param data
     */
    changeView(view, data) {
        this.setState({
            currentView: view,
            viewData: data
        });
    }

    /**
     * Fetches data about all conversations regarding current position.
     *
     * @param posID
     */
    loadConvoData(posID) {
        const url = `convoq.json?pid=${posID}`;

        Ajax.doAjaxQuery(url)
            .then((data) => {

                // Update to show list view.
                this.setState({
                    ready: true,
                    currentView: 'list',
                    viewData: JSON.parse(data)
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /**
     * Called by React at render time. Logic for determining what to render is here.
     */
    render() {
        const viewProps = {
                data: this.state.viewData,
                updateFunction: this.passUpdateFunctions,
                posID: this.props.posID
            },
            views = {
                'list' :
                    <ConvoList
                        viewProps = {viewProps}
                    />,
                'convoEdit' :
                    <ConvoEdit
                        viewProps = {viewProps}
                    />
            };

        if(!this.state.ready) {

            // Do we really want to assume that we are always beginning this state with the list view?
            this.loadConvoData(this.props.posID);

            return(<div style = {styles.convoStyle}>Stand by for conversation data.</div>);
        }

        return(views[this.state.currentView] || null);
    }
}

module.exports = ConvoViews;