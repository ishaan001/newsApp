import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const[article, setArticle] = useState([])
  const[page, setPage] = useState(1)
  const[totalResult, setTotalResult] = useState(0)
  
  const capatalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const updateNews = async() => {
    props.setProgress(10)
    let url =
    `https://newsapi.org/v2/top-headlines?country=${props.countryCode}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    props.setProgress(50)
    setArticle(parseData.articles)
    setTotalResult(parseData.totalResults)
    // setLoading(false)
     props.setProgress(100)
}

  useEffect(() => {
    document.title = `${capatalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  // alternative of component didMount is useEffect
  // async componentDidMount() {
  //   console.log("componentDidMount");
  //   this.updateNews();
  // }

  const fetchMoreData = async () => {
    console.log("fetchMoreData");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${props.countryCode}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticle(article.concat(parseData.articles))
    setTotalResult( parseData.totalResults)
    setPage(page+1)
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop: '90px'}}>News Monekey - Top {capatalizeFirstLetter(props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length < totalResult}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {article.map((element) => {
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

export default News;
