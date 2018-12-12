import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Authors from './Authors'

class Book extends Component {
	static propTypes = {		
		book: PropTypes.object.isRequired,
	  	moveBook: PropTypes.func.isRequired
	}

	moveBook = event => 
			this.props.moveBook(this.props.book, event.target.value);

	render() {
		const { title, authors, imageLinks, shelf } = this.props.book

    return (
		<div className="book">
	      <div className="book-top">
	        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})`}}></div>
	        <div className="book-shelf-changer">
	          <select onChange={this.moveBook} defaultValue={shelf}>
	            <option value="move" disabled>Move to...</option>
	            <option value="currentlyReading">Currently Reading</option>
	            <option value="wantToRead">Want to Read</option>
	            <option value="read">Read</option>
	            <option value="none">None</option>
	          </select>
	        </div>
	      </div>
	      <div className="book-title">{title}</div>
	      <div className="book-authors">
						<Authors 
							authors={authors}
						/>
				</div>
	    </div>
    )}   
}

export default Book