import * as React from 'react';
import b1 = require('../../assets/images/b1.png');
import b2 = require('../../assets/images/b2.png');
import b3 = require('../../assets/images/b3.png');
import b4 = require('../../assets/images/b4.png');

interface State {
    interval: number;
}

class HomeScreen extends React.Component<{}, State> {
    // tslint:disable-next-line
    public timer: any;
    public state = {
      interval: 0,
    };
    public componentDidMount() {
      this.timer = setInterval(() => {
        if (this.state.interval <= 9000) {
          this.setState({ interval: this.state.interval + 410 });
        } else {
          this.setState({ interval: 0 });
        }
      }, 2000);
    }

    public componentWillUnmount() {
      clearInterval(this.timer);
    }

    public render() {
     const { interval } = this.state;
     const styles = {
       margin: `0 0 0 -${interval}px`,
     };
     return (
         <div className="bitto-home-screen">
           <div className="bitto-home-screen-intro">
             <h1>First Exchange with Proof of Stake</h1>
             <h1>Blockchain Technology</h1>
           </div>
             <div className="bitto-home-screen-carousel">
               <div className="bitto-home-screen-carousel-content">
                 <div className="bitto-home-screen-carousel-content-items" style={styles}>
                   <a href="#"><img src={b1} alt="b1"/> </a>
                   <a href="#"><img src={b2} alt="b2"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b1} alt="b1"/> </a>
                   <a href="#"><img src={b2} alt="b2"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b1} alt="b1"/> </a>
                   <a href="#"><img src={b2} alt="b2"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b1} alt="b1"/> </a>
                   <a href="#"><img src={b2} alt="b2"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                   <a href="#"><img src={b3} alt="b3"/> </a>
                   <a href="#"><img src={b4} alt="b4"/> </a>
                 </div>
               </div>
             </div>
         </div>
     );
   }
}

export {
    HomeScreen,
};
