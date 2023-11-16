import React, { Component } from "react";
import newsImg from "../images/news.jpg"

export class NewsItem extends Component {
  constructor() {
    super();
    this.state = {error: false };
  }

  handleImageError() {
    this.setState({error: true });
  }

  render() {
    let { newsItemDescription } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{newsItemDescription.source.name}</span>
          <img
            src={!this.state.error ? (newsItemDescription.urlToImage ? newsItemDescription.urlToImage : newsImg) : newsImg}
            onError={this.handleImageError.bind(this)}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{newsItemDescription.title ? newsItemDescription.title : " "}</h5>
            <p className="card-text">{newsItemDescription.description ? newsItemDescription.description.slice(0, 100) : " "}...</p>
            <p className="card-text"><small className="text-body-secondary"> by {newsItemDescription.author ? newsItemDescription.author : "anonymous"} on : {newsItemDescription.publishedAt ? new Date(newsItemDescription.publishedAt).toGMTString() : " "}</small></p>
            <a
              href={newsItemDescription.url}
              target="_blank"
              rel="noreferrer"
              /*_blank is used as on clicking the link it will open new tab*/ 
              className="btn btn-sm btn-dark"
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
