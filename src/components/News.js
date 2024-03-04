import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }

  static priptype = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor () {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount () {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a4e1168138a4b08b1048c60fdf593a4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  handlePrevPage = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a4e1168138a4b08b1048c60fdf593a4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  handleNextPage = async() => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a4e1168138a4b08b1048c60fdf593a4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })    
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((ele) => {
              return <div className="col-md-4" key={ele.url}>
              <NewsItem  
              title={ele ? ele.title : ""} 
              description={ele ? ele.description : ""} 
              imgUrl={ele.urlToImage} newsUrl={ele.url}
              author={ele.author}
              date={ele.publishedAt}
              source={ele.source.name} /> 
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type='button' disabled={this.state.page <= 1} className='btn btn-dark' 
          onClick={this.handlePrevPage}>&larr; Previous</button>

          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} 
          className='btn btn-dark' onClick={this.handleNextPage}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
