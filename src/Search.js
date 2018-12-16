import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'

class Search extends Component {
    static propTypes = {
        searchBooks: PropTypes.func.isRequired,
        moveBook: PropTypes.func.isRequired,
        searchBooksResults: PropTypes.array.isRequired,
        searchTerms: PropTypes.string
    }

    searchBooks = event => {
        this.props.searchBooks(event.target.value)
    }

    render() {
        const { searchBooksResults, moveBook, searchTerms } = this.props

		return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search">Back</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} value={searchTerms}/>
                </div>
                </div>
                <div className="search-books-results">
                <ListBooks
                    books={searchBooksResults}
                    moveBook={moveBook}
                />
                </div>
            </div>            
		)
	}   
}

export default Search