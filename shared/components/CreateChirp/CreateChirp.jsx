import React, { Component, PropTypes } from 'react';

class CreateChirp extends Component {
    constructor(props, context) {
        super(props, context);
        this.addChirp = this.addChirp.bind(this);
    }

    addChirp() {
        const contentRef = this.refs.content;
        if (contentRef.value) {
            this.props.addChirp(contentRef.value);
            contentRef.value = '';
        }
    }

    render() {
        return (
            <div>
            <div className="form-content">
            <h2 className="form-title">Create new chirp</h2>
            <textarea placeholder="Chirp Content" className="form-field" ref="content"></textarea>
            <a className="chirp-submit-button align-right" href="#" onClick={this.addChirp}>Submit</a>
            </div>
            </div>
        );
    }
}

CreateChirp.propTypes = {
    addChirp: PropTypes.func.isRequired
};

export default CreateChirp;
