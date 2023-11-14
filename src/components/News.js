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
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("componentDidMount");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=1";
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ article: parseData.articles });
  }

  handlePrevClick = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=${this.state.page -1}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      article: parseData.articles
    });
  };

  handleNextClick = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=${this.state.page + 1}`;
      let data = await fetch(url);
    let parseData = await data.json();
    if(parseData.articles.length === 0) {

    }else {
      this.setState({
        page: this.state.page + 1,
        article: parseData.articles
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1>News Monekey - Top Headlines of the day</h1>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
        <div className="row">
          {this.state.article.map((element) => {
            return (
              <div className="col-6 col-md-4" key={element.url}>
                <NewsItem newsItemDescription={element} />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page < 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            disable={this.state.article === null}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
