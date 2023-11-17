import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  capatalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("inside news constructor");
    this.state = {
      article: [],
      loading: true,
      page: 1,
      countryCode: "in",
      totalResult: 0
    };
    document.title = `${this.capatalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.state.countryCode}&category=${this.props.category}&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults,
      loading: false
    });
}

  async componentDidMount() {
    console.log("componentDidMount");
    console.log(this.state.page);
    this.updateNews();
  }

  fetchMoreData = async () => {
    console.log("fetchMoreData");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.state.countryCode}&category=${this.props.category}&apiKey=2c62d05110334d73a41aa33ad0638d8a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      article: this.state.article.concat(parseData.articles),
      totalResult: parseData.totalResults,
      page: this.state.page+1
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">News Monekey - Top {this.capatalizeFirstLetter(this.props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length < this.state.totalResult}
          loader={<Spinner />}
        >
          <div className="container">
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
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
