import React from "react";

var BookList = React.createClass({
  getInitialState() {
    return ({
      books: [
        {name: "Zero to One", author: "Peter Thiel"},
        {name: "Monk who sold his Ferrari", author: "Robin Sharma"},
        {name: "Wings of Fire", author: "A.P.J. Abdul Kalam"}
      ],
      selectedBooks: [],
      error: false
    });
  },

  _renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    }
  },

  _renderBook(book) {
    return (
      <div className="checkbox" key={book.id}>
        <label>
          <input type="checkbox" value={book.name}
              onChange={this.handleSelectedBooks} />
              {book.name} -- {book.author}
        </label>
      </div>
    );
  },

  handleSelectedBooks(event) {
    var selectedBooks = this.state.selectedBooks;
    var index = selectedBooks.indexOf(event.target.value);

    if (event.target.checked) {
      if (index === -1) selectedBooks.push(event.target.value);
    } else {
      selectedBooks.splice(index, 1);
    }

    this.setState({
      selectedBooks: selectedBooks
    });
  },

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();

    if (this.state.selectedBooks.length === 0) {
      this.setState({
        error: "Please choose at least one book to continue"
      });
    } else {
      this.setState({
        error: false
      });
      this.props.updateFormData({
        selectedBooks: this.state.selectedBooks
      });
    }

    this.props.updateFormData({
      selectedBooks: this.state.selectedBooks
    });

    console.log("Form Submitted");
  },

  render() {
    var errorMessage = this._renderError();

    return (
      <div>
        <h3>Choose from wide variety of books in our store.</h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {this.state.books.map((book) => {
            return this._renderBook(book);
          })}
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    );
  }
});

var ShippingDetails = React.createClass({
  render() {
    return (
      <h1>Enter your shipping information.</h1>
  );
}
});

var DeliveryDetails = React.createClass({
  render() {
    return (
      <h1>Choose your delivery options here.</h1>
  );
}
});

var BookStore = React.createClass({
  // getInitialState() {
  //   return ({ currentStep: 1, formValues: {} });
  // },

  updateFormData(formData) {
    var formValues = Object.assign({}, this.state.formValues, formData);
    var nextStep = this.state.currentStep + 1;
    this.setState({
      currentStep: nextStep,
      formValues: formValues
    });

    console.log(formData);
  },

  render() {
    switch (this.state.currentStep) {
      case 1:
        return <BookList updateFormData={this.updateFormData} />;
      case 2:
        return <ShippingDetails updateFormData={this.updateFormData} />;
      case 3:
        return <DeliveryDetails updateFormData={this.updateFormData} />;
    }
  }
});
