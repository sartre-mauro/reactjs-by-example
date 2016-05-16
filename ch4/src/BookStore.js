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
  getInitialState() {
    return ({
      fullName: "", contactNumber: "", shippingAddress: "", error: false
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

  _validateInput() {
    if (this.state.fullName === '') {
      this.setState({
        error: "Please enter full name"
      });
    } else if (this.state.contactNumber === '') {
      this.setState({
        error: "Please enter contact number"
      });
    } else if (this.state.shippingAddress === '') {
      this.setState({
        error: "Please enter shipping address"
      });
    } else {
      this.setState({ error: false });
      return true;
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    var formData = {
      fullName: this.state.fullName,
      contactNumber: this.state.contactNumber,
      shippingAddress: this.state.shippingAddress
    };

    if (this._validateInput()) {
      this.props.updateFormData(formData);
    }
  },

  handleChange(event, attribute) {
    var newState = this.state;
    newState[attribute] = event.target.value;
    this.setState(newState);
    console.log(this.state);
  },

  render() {
    var errorMessage = this._renderError();

    return (
      <div>
        <h1>Enter your shipping information.</h1>
        {errorMessage}
        <div style={{width: 200}}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input className="form-control"
                type="text"
                placeholder="Full Name"
                value={this.state.fullName}
                onChange={(event) => this.handleChange(event, "fullName")}
                />
            </div>
            <div className="form-group">
              <input className="form-control"
                type="text"
                placeholder="Contact Number"
                value={this.state.contactNumber}
                onChange={(event) => this.handleChange(event, "contactNumber")}
                />
            </div>
            <div className="form-group">
              <input className="form-control"
                type="text"
                placeholder="Shipping Address"
                value={this.state.shippingAddress}
                onChange={(event) => this.handleChange(event, "shippingAddress")}
              />
            </div>
            <div className="form-group">
              <button type="submit"
                ref="submit"
                className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

var DeliveryDetails = React.createClass({
  getInitialState() {
    return ({ deliveryOption: "Primary" });
  },

  handleChange(event) {
    this.setState({
      deliveryOption:  event.target.value
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFormData(this.state);
  },

  render() {
    return (
      <div>
        <h1>Choose your delivery options here.</h1>
        <div style={{width: 200}}>
          <form onSubmit={this.handleSubmit}>
            <div className="radio">
              <label>
                <input type="radio"
                  checked={this.state.deliveryOption === "Primary"}
                  value="Primary"
                  onChange={this.handleChange}
                />Primary -- Next day delivery
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio"
                  checked={this.state.deliveryOption === "Normal"}
                  value="Normal"
                  onChange={this.handleChange}
                />Normal -- 3-4 days
              </label>
            </div>
            <button className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
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
