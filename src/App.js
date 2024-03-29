import React, { Component } from 'react';
import logo from './adventureTime.png';
import './App.css';
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper";
import cards from "./characters.json";

let hearts = 3;

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    clickedArray: [],
    hearts,
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickPicture = id => {
    // Arrange the pictures in a random manner
    const shuffledArray = this.shuffleArray(cards);
    this.setState({cards: shuffledArray});
    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray, end of if block
    if (this.state.clickedArray.includes(id)) {
      this.setState({ 
        score: 0, 
        clickedArray: [], 
        message: "Aww, What The Biz...Game Over? ☹️ Click an image to start again!", 
        shakeit: "true"
      });
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "YUS! 🙂",
        shakeit: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit is set to true
  }
  shuffleArray = (picturesArray) => {
      for (let i = picturesArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
      }
      return picturesArray;
  }
  renderHearts() {
    let divs = [];

    for (let i = 0; i < this.state.hearts; i++) {
      divs.push(<div hey={i} className="hearts"></div>);
    }

    return <div>{divs}</div>
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h3 className="App-intro">
          <strong>Click an image to earn points, but don't click on the same image twice!</strong>
          {/* <div className="hearts"><strong>Lifes: {this.state.hearts}</strong></div>  */}
          <p className="score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper
        shakeWrapper = {this.state.shakeit}
        pictures=
          {this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id} // to get rid of unique key prop warning
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
        <footer className="footer">
      <div className="container">
        <span className="text-muted">&copy;Kalamath - Adventure Time Clicky</span>
      </div>
    </footer> 
      </div>
    );
  }
}
export default App;