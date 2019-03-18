import React from "react";
import content from "../data/cards";
import { TweenMax } from "gsap/TweenMax";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.element1 = null;
    this.element2 = null;
  }
  state = {
    cards: [],
    opened: []
  };

  openItem = (e, i) => {
    TweenMax.to(e.target, 1, { rotationY: 0, backgroundColor: "white" });
    if (!!this.element1) {
      this.element2 = e.target;
    } else {
      this.element1 = e.target;
    }
    this.setState(state => {
      const cards = state.cards.map((item, j) => {
        if (j === i) {
          return {
            value: item.value,
            index: item.index,
            isOpen: !item.isOpen
          };
        } else {
          return {
            value: item.value,
            index: item.index,
            isOpen: item.isOpen
          };
        }
      });

      return {
        cards,
        opened: [...this.state.opened, this.state.cards[i]]
      };
    });
  };

  componentWillMount = () => {
    //shuffle starting cards
    content.sort(() => Math.random() - 0.5);
    this.setState({
      cards: content
    });
  };

  componentDidUpdate = () => {
    let opened = this.state.opened;
    if (opened.length === 2) {
      if (opened[0].value === opened[1].value) {
        this.element1 = null;
        this.element2 = null;
      } else {
          setTimeout(() => {
              TweenMax.to(this.element1, 1, { rotationY: 180, backgroundColor: "black" });
              TweenMax.to(this.element2, 1, { rotationY: 180, backgroundColor: "black" });
              this.element1 = null;
              this.element2 = null;
              console.log(64, this.element1);
          this.setState(state => {
            const cards = state.cards.map((item, j) => {
              if (
                item.index === opened[0].index ||
                item.index === opened[1].index
              ) {
                return {
                  value: item.value,
                  index: item.index,
                  isOpen: false
                };
              } else {
                return {
                  value: item.value,
                  index: item.index,
                  isOpen: item.isOpen
                };
              }
            });

            return {
              cards
            };
          });
        }, 1059);
      }
      this.setState({
        opened: []
      });
    }
  };

  render() {
    return (
      <div className="game">
        {" "}
        {this.state.cards.map((item, i) => (
          <div
            onClick={e => this.openItem(e, i, item)}
            key={item.index}
            //  style = {item.isOpen ? {backgroundColor: "white"} : {backgroundColor: "black"}}
             style = { {transform: "rotateY(180deg)"}  }

            >
            {item.value}{" "}
          </div>
        ))}{" "}
      </div>
    );
  }
}

export default Game;
