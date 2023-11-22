import React, {useState} from "react";
import newsImg from "../images/news.jpg"

const NewsItem = (props) => {
   
  const [error, setError] = useState(false);
   

  const handleImageError = () => {
    setError(true);
  }


    let { newsItemDescription } = props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{newsItemDescription.source.name}</span>
          <img
            src={!error ? (newsItemDescription.urlToImage ? newsItemDescription.urlToImage : newsImg) : newsImg}
            onError={handleImageError}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{newsItemDescription.title ? newsItemDescription.title : " "}</h5>
            <p className="card-text">{newsItemDescription.description ? newsItemDescription.description.slice(0, 100) : " "}...</p>
            <p className="card-text"><small className="text-danger"> by {newsItemDescription.author ? newsItemDescription.author : "anonymous"} on : {newsItemDescription.publishedAt ? new Date(newsItemDescription.publishedAt).toGMTString() : " "}</small></p>
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

export default NewsItem;
