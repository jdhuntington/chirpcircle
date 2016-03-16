import React, { Component, PropTypes } from 'react';

class CreateChirp extends Component {
    constructor(props, context) {
        super(props, context);
        this.addChirp = this.addChirp.bind(this);
    }

    addChirp() {
        const contentRef = this.refs.content;
        const usernameRef = this.refs.username;
        if (contentRef.value && usernameRef.value) {
            this.props.addChirp(usernameRef.value, contentRef.value);
            contentRef.value = '';
        }
    }

    render() {
        return (
            <div>
            <p className="control">
            <label className="label">What's your name?</label>
            <input type="text" placeholder="what's up?" className="input" ref="username"></textarea>
            </p>

            <p className="control">
            <label className="label">Chirp about something!...</label>
            <textarea placeholder="what's up?" className="textarea" ref="content"></textarea>
            </p>
            <p className="control">
            <button className="button is-primary" onClick={this.addChirp}>Chirp!</button>
            </p>
            </div>
        );
    }
}

CreateChirp.propTypes = {
    addChirp: PropTypes.func.isRequired
};

export default CreateChirp;
