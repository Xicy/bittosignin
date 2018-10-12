import axios from 'axios';
import * as React from 'react';

interface PostType {
  body: string;
  created_at: string;
  first_image_url: string;
  id: number;
  second_image_url: string;
  title: string;
  visible: boolean;
}

interface NewsState {
    posts: PostType[];
    current: number;
    firstRun: boolean;
}

class News extends React.Component< {} , NewsState > {
  public timer = 0;
  public interval = 5000;

  constructor(props){
      super(props);
      this.state = {
          posts: [],
          current: 0,
          firstRun: true,
      };
  }

  public componentDidMount() {
      axios.get('https://applogic.uat.bittoexchange.com/api/v1/posts')
      .then(response => {
          this.setState({
              posts: response.data,
          });
      })
      // tslint:disable-next-line:no-console
      .catch(error => console.log(error));

      // news slideshow
      this.timer = window.setInterval(() => {
          let next = this.state.current + 1;
          if (next === this.state.posts.length) {
              next = 0;
          }
          this.setState({
              current: next,
              firstRun: false,
          });
      }, this.interval);
  }

  public componentWillUnmount() {
      clearInterval(this.timer);
  }

  public renderCarouselItems() {
        const carouselContent =  this.state.posts.map((post, i) => {
          let classes = 'carousel-item';
          if (i === this.state.current) {
            // move in the picture
            classes += ' displayed';
            if (!this.state.firstRun) {
              classes += ' ps-move';
            }
          } else if (this.state.current === 0 && i === this.state.posts.length - 1) {
            // move out the previous displayed picture which is the last
            classes += ' on-left ps-move';
            classes += ' ps-move';
          } else if (i === this.state.current - 1) {
            // move out the "previous" picture
            classes += ' on-left ps-move';
          } else {
            classes += ' on-right';
          }
          return (
              // tslint:disable-next-line
              <div className={classes}>
                  <div className="carousel-row">
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                  </div>
                  <img src={post.first_image_url} className="first_image"/>
              </div>
          );
        });
        return carouselContent;
      }

  public render() {
      return (
          <div className="bitto-news">
              <div className="cr-table-header__content">
                  <div className="cr-title-component">News</div>
              </div>
              <div className="bitto-carousel">
                  {this.renderCarouselItems()}
              </div>
          </div>
      );
  }
}

export {
  News,
};
