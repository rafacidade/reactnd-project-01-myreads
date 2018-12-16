import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Authors from './Authors'
import ShelfChanger from './ShelfChanger'

class Book extends Component {
	static propTypes = {		
		book: PropTypes.object.isRequired,
	  moveBook: PropTypes.func.isRequired
	}

	render() {
		const { book, moveBook } = this.props

    return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
				</div>
				<ShelfChanger
					book={book}
					moveBook={moveBook}
				/>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">
				<Authors
					authors={book.authors}
				/>
			</div>
	    </div>
    )}   
}

export default Book