import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }


    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6cdd7524477f467a9a8e0c5a973b9fbf&page=1&pagesize=${this.props.pageSize}`
        this.setState({loading:true});
        let data= await fetch(url);
        let parseData =await data.json();
        console.log(parseData);
        this.setState({
            articles:parseData.articles,
            totalResults:parseData.totalResults,
            loading:false
        });
    }
    
    handlePrevClick= async()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6cdd7524477f467a9a8e0c5a973b9fbf&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parseData =await data.json();
        this.setState({
            articles:parseData.articles,
            page:this.state.page -1,
            loading:false
        });
    }

    handleNextClick=async()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6cdd7524477f467a9a8e0c5a973b9fbf&page=${this.state.page +1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parseData =await data.json();
        this.setState({
            articles:parseData.articles,
            page:this.state.page +1,
            loading:false
        });
    }


    render() {
        return (
            <div className="container my-4 ">
                <h2 className="text-center">News App - Top Heading</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}  
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
