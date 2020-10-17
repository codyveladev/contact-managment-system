import React from 'react';

import pic from "./error.png";


export default function NotFound() {
    return (
      <div className="container text-center">
        <h1 className="display-4">
          <span className="text-danger">Oops!</span> Something went wrong
        </h1>
        <img src={pic} alt="" style={{ height: "300px", width: "300px" }}></img>
        <p className="lead">This page does not exists</p>
      </div>
    );
}
