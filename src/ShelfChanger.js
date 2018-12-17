import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
	static propTypes = {
        book: PropTypes.object.isRequired,
        moveBook: PropTypes.func.isRequired    
	}

    moveBook = event =>
        this.props.moveBook(this.props.book, event.target.value);	

	render() {
        const shelf = this.props.book.shelf
        console.log(this.props.book)

        return (
            <div className="book-shelf-changer">
                <select onChange={this.moveBook} defaultValue={shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }   
}

export default ShelfChanger