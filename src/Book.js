import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  state = {
    value: ''
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
    this.props.onChangeShelf(this.props.book, event.target.value)
  }
  render() {
    const {book, defaultValue} = this.props
    const {value} = this.state

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {(book.imageLinks === undefined) ?
              <div className="book-cover"
                style={{ width: 128,
                height: 193 }} /> :
              <div className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                }} /> }
            <div className="book-shelf-changer">
              <select value={value !== '' ? value : defaultValue} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors}
          </div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired
}

export default Book
