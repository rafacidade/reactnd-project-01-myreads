import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Authors extends Component {
	static propTypes = {
		authors: PropTypes.array.isRequired
	}

	render() {
    const authors = this.props.authors

    return (
		<div>
          {authors.map( (author, index) => (
               <div key={index}>{author}</div>
          ))}
	    </div>
    )}   
}

export default Authors