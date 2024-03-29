import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card my-2">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "98%", zIndex: "1"}}>{source}</span>
          <img src={!imgUrl ? "https://i.ytimg.com/vi/v0BexPK8Eqk/maxresdefault.jpg" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
