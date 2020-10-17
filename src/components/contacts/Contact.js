import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false,
    clicked: false,
  };

  toggleClass() {
    this.setState({ clicked: !this.state.clicked });
  }

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone, website } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={() => {
                    this.toggleClass();
                    console.log(this.state.clicked);

                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    });
                  }}
                  className={
                    this.state.clicked
                      ? "fas fa-chevron-circle-up"
                      : "fas fa-chevron-circle-down"
                  }
                  style={{ cursor: "pointer" }}
                ></i>{" "}
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-user-edit text-info"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "red",
                      marginRight: "1rem",
                    }}
                  ></i>
                </Link>
              </h4>

              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    Email: <a href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li className="list-group-item">Phone: {phone}</li>
                  <li className="list-group-item">Website: www.{website}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
