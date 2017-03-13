import React, {PropTypes, Component} from 'react';

import './bootstrap.min.css';
import './App.css';
import json from './content.json';

class App extends Component {
    constructor(props) {
        super(props);
        /**
         * @type {{current, isOpen: (*)}}
         */
        this.state = {
            current: props.current,
            isOpen: props.isOpen,
            hideImage: false
        }
        // bind all the events in constructor
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onError = this.onError.bind(this);
    }

    /**
     * update current index
     */
    next() {
        if (this.state.current < this.props.content.length - 1) {
            this.setState(prevState => {
                    current: prevState.current++
                }
            );
        }
    }

    /**
     * update current index
     */
    prev() {
        if (this.state.current != 0) {
            this.setState(prevState => {
                    current: prevState.current--
                }
            );
        }
    }

    /**
     * update isOpen flag
     */
    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    /**
     * hide broken image
     */
    onError() {
        this.setState({
            hideImage: true
        })
    }
    
    render() {
        let current = this.state.current
        let currentItem = this.props.content[current]
        {/* set class names  */}
        let contentClassName = (this.state.isOpen) ? 'content' : 'content slide-up'
        let expandIconClass = (this.state.isOpen) ? 'glyphicon glyphicon-triangle-top' : 'glyphicon glyphicon-triangle-bottom'

        {/* get the template for dangerouslySetInnerHTML  */}
        let template = { __html: currentItem.description}

        {/* get the next and prev items title  */}
        let prev = (this.state.current == 0) ? null : this.props.content[current - 1].title
        let next = (this.state.current == (this.props.content.length -1)) ? null : this.props.content[current + 1].title

        let thumbnail = currentItem.thumbnail

        return (
            <div className="widget">
                <div className="header">
                    <div className="left">
                        <span className="glyphicon glyphicon-file" aria-hidden="true"></span>
                        <strong style={{marginLeft: 5}}>{this.props.title}</strong>
                    </div>
                    <div className="right" onClick={this.toggle}>
                        <span className={expandIconClass} aria-hidden="true"></span>
                    </div>
                </div>
                <div className={contentClassName} >
                    <div className="wrapper">
                        {/* if thumbnail provided then display it */}
                        {thumbnail && !this.state.hideImage && <img src={thumbnail} alt="" onError={this.onError} />}
                        <div className="text">
                            <p>{currentItem.title}</p>
                            <p dangerouslySetInnerHTML={template} /> {/* not escape html*/}
                        </div>
                    </div>

                    <div className="footer">
                        <div onClick={this.prev}>
                            {prev && <span className="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>}
                            {prev && <a className="left">{prev}</a>}
                        </div>
                        <div onClick={this.next}>
                            {next && <a className="right">{next}</a>}
                            {next && <span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * make sure all the props is required
 * @type {{isOpen: *, current: *, content: *, title: *}}
 */
App.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    current: PropTypes.number.isRequired,
    content: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
}

/**
 * set default value as the widget is expanded and it will use the first item from the json
 * @type {{isOpen: boolean, current: number, title: (*), content}}
 */
App.defaultProps = {
    isOpen: true,
    current: 0,
    title: json.title,
    content: json.content
}

export default App
