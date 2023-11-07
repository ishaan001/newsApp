import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { newsItemDescription } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={newsItemDescription.urlToImage}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{newsItemDescription.title}</h5>
            <p className="card-text">{newsItemDescription.description.slice(0, 100)}...</p>

            <a
              href={newsItemDescription.url}
              target="_blank"
              rel="noreferrer"
              /*_blank is used as on clicking the link it will open new tab*/ 
              className="btn btn-sm btn-secondary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
