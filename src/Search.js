import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'

class Search extends Component {
    static propTypes = {
        searchBooks: PropTypes.func.isRequired,
        moveBook: PropTypes.func.isRequired,
        searchBooksResults: PropTypes.array.isRequired
    }

    searchBooks = event => {
        this.props.searchBooks(event.target.value)
    }

    render() {
        const books = this.props.searchBooksResults

		return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search">Back</button>
              </Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
              </div>
            </div>
            <div className="search-books-results">
              <ListBooks
                books={books}
                moveBook={this.props.moveBook}
              />
            </div>
        </div>            
		)
	}   
}

export default Search