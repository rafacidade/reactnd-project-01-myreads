import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Route, Link } from 'react-router-dom'
import bookNoImage from './images/book-noimage.png'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchBooksResults: [],
		searchTerms: ''
	}

	componentDidMount() {
		BooksAPI.getAll().then((response) => {
			this.setState({ books: this.normalizeBooks(response) })
		})
	}

	//complete book object if necessary
	normalizeBooks = (books) => {
		return books.map(book => {
			if (book.authors === undefined) {
				book = {...book, authors: [] }
			}
			if (book.shelf === undefined) {
				book = {...book, shelf: 'none' }
			}
			if (book.imageLinks === undefined) {
				book = {...book, imageLinks: { smallThumbnail: bookNoImage } }
			}
			return book
		})
	}

	//set shelf for books in search results
	setShelf = () => {
		let books = []
		for(let book of this.state.searchBooksResults) {
			for(const b of this.state.books) {
				if (b.id === book.id) {
					book.shelf = b.shelf
				}				
			}

			books = [...books, book]
		}
		
		this.setState( { searchBooksResults: books } )
	}
	
	getShelfBooks = (shelf) => {
		return this.state.books.filter((book) => book.shelf === shelf)
	}
	
	moveBook = (book, shelf) => {
		if(book.shelf !== shelf) {
			BooksAPI.update(book, shelf).then( response => {
				book.shelf = shelf;
				this.setState(previousState => ({
					books: [ ...previousState.books.filter(b => b.id !== book.id), book ]
				}))
			})
		}
	}
	
	searchBooks = (query) => {
		//update search terms and clear previous results
		this.setState({ searchTerms: query })
		this.setState({ searchBooksResults: [] })
		
		if(query) {
			BooksAPI.search( query.trim() ).then( response => {
				if(!response.error) {
					this.setState({ searchBooksResults: this.normalizeBooks(response) })
					this.setShelf()
				}
			})
		}
	}
	
	render() {
		return (
			<div className="app">
				<Route 
					path='/search' 
					render={({ history }) => (
						<Search
							searchBooks={this.searchBooks}
							moveBook={this.moveBook}
							searchBooksResults={this.state.searchBooksResults}
							searchTerms={this.state.searchTerms}
						/>
					)}
				/>
				<Route
					exact path='/'
					render={() => (
						<div className="list-books">
							<div className="list-books-title">
              					<h1>MyReads</h1>
							</div>
            				<div className="list-books-content">
              					<div>
              						<Shelf 
										shelfTitle="Currently Reading"
										books={this.getShelfBooks("currentlyReading")}
										moveBook={this.moveBook}
              						/>
									<Shelf 
										shelfTitle="Want to Read"
										books={this.getShelfBooks("wantToRead")}
										moveBook={this.moveBook}
									/>
									<Shelf 
										shelfTitle="Read"
										books={this.getShelfBooks("read")}
										moveBook={this.moveBook}
									/>
              					</div>
            				</div>
							<Link to="/search">
                				<div className="open-search"><button>Search</button></div>
							</Link>            
          				</div>
        			)} 
				/>
      		</div>
		)
	}
}

export default BooksApp
