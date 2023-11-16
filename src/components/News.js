import React, { Component } from "react";
import NewsItem from "./NewsItem";
import newsData from "../SampleOutpout.json";
import Spinner from "./Spinner";

export class News extends Component {

  capatalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("inside news constructor");
    this.state = {
      article: newsData.articles,
      loading: false,
      page: 1,
      nextButton: false,
      countryCode: "in"
    };
    document.title = `${this.capatalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async componentDidMount() {
    console.log("componentDidMount");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.state.countryCode}&category=${this.props.category}&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      article: parseData.articles,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.state.countryCode}&category=${this.props.category}&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      article: parseData.articles,
      nextButton: false,
      loading: false,
    });
  };

  handleNextClick = async () => {
     let url = `https://newsapi.org/v2/top-headlines?country=${this.state.countryCode}&category=${this.props.category}&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
     this.setState({ loading: true });
     let data = await fetch(url);
     let parseData = await data.json();
    if (parseData.articles.length === 0) {
      this.setState({
        nextButton: true,
        loading:false
      });
    } else {
      this.setState({
        page: this.state.page + 1,
        article: parseData.articles,
        loading: false,
      });
      
    }
   
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monekey - Top {this.capatalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.article.map((element) => {
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
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            disabled={this.state.nextButton}
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
