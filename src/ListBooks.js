import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
	    moveBook: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	render() {
    	const { books, moveBook } = this.props

	    return (
	    <ol className="books-grid">
	      	{books.map((book) => (
	        <li key={book.id}>
				<Book 
					book={book}
	        		moveBook={moveBook}
	        	/>
	        </li>
	      ))}
	    </ol>
		)
  	}
}

export default ListBooks