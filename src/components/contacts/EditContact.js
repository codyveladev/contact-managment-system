import React, { Component } from "react";

import { Consumer } from "../../context";

import TextInputGroup from "../layout/TextInputGroup";

import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    website: "",
    errors: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      website: contact.website,
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone, website } = this.state;

    //Check for error
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone number is required" } });
      return;
    }
    if (website === "") {
      this.setState({ errors: { website: "Website is required" } });
      return;
    }

    const updContact = {
      name,
      email,
      phone,
      website,
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
    //Clear state

    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors, website } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                <h4>Edit Contact</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <div className="form-group">
                    <TextInputGroup
                      name="name"
                      label="Name:"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextInputGroup
                      name="email"
                      label="Email: "
                      placeholder="Enter Email Address..."
                      value={email}
                      onChange={this.onChange}
                      type="email"
                      error={errors.email}
                    />
                    <TextInputGroup
                      name="phone"
                      label="Phone:"
                      placeholder="Enter Phone Number..."
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />
                    <TextInputGroup
                      name="website"
                      label="Personal Website:"
                      placeholder="Enter Website"
                      value={website}
                      onChange={this.onChange}
                      error={errors.website}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-success"
                  ></input>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
