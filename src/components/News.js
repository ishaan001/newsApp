import React, { Component } from "react";
import NewsItem from "./NewsItem";
import newsData from "../SampleOutpout.json";

export class News extends Component {
  constructor() {
    super();
    console.log("inside news constructor");
    this.state = {
      article: newsData.articles,
      loading: false,
    };
  }
  render() {
    return (
      <div className="container my-3">
        <h2>News Monekey - Top Headlines of the day</h2>
        <div className="row">
          {this.state.article.map((element) => {
            return (
              <div className="col-6 col-md-4" key={element.url}>
                <NewsItem newsItemDescription={element} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
