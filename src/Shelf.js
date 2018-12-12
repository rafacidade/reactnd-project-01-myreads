import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class Shelf extends Component {
    static propTypes = {
		shelfTitle: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
	    moveBook: PropTypes.func.isRequired
	}

    render() {
		const { shelfTitle, books, moveBook } = this.props

		return (
		<div className="bookshelf">
        	<h2 className="bookshelf-title">{shelfTitle} ({books.length})</h2>        	
            <div className="bookshelf-books">
            	<ListBooks 
            		books={books}
            		moveBook={moveBook}
        		/>
            </div>
        </div>
		)
	}   
}

export default Shelf