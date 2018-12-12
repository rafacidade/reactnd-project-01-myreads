import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
	state = {
    books: []
  }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
      this.setState({ books })
		})
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
    this.setState({ books: [] })

    if(query) {
      BooksAPI.search(query).then( response => {
        console.log(response)
        this.setState({ books: response })
      })
    }
  }

	render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <Search searchBooks={this.searchBooks} moveBook={this.moveBook} searchBooksResults={this.state.books}/>        
        )} />
        <Route exact path='/' render={() => (        
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
        )} />
      </div>
    )
  }
}

export default BooksApp
