import React from "react";
import { TweenMax } from "gsap/TweenMax";
import { connect } from "react-redux";

import {
  openCard,
  closeCards,
  clearOpened,
  shuffle
} from "../actions/postActions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.element1 = null;
    this.element2 = null;
  }

  openItem = (e, i, item) => {
    this.props.openCard(item.index, i);

    TweenMax.to(e.target, 1, {
      rotationY: 0,
      backgroundColor: "white"
    });

    if (this.element1 === null && this.element2 === null) {
      this.element1 = e.target;
    } else if (this.element2 === null) {
      this.element2 = e.target;
    }
  };

  componentDidUpdate = () => {
    let opened = this.props.opened;
    // compare two opened card
    if (opened.length === 2) {
      if (opened[0].value === opened[1].value) {
        this.element1 = null;
        this.element2 = null;
      } else {
        TweenMax.to(this.element1, 1, {
          rotationY: 180,
          backgroundColor: "black",
          delay: 1
        });
        TweenMax.to(this.element2, 1, {
          rotationY: 180,
          backgroundColor: "black",
          delay: 1
        });
        this.element1 = null;
        this.element2 = null;
        setTimeout(() => {
          this.props.closeCards();
        }, 10);
      }
        

      setTimeout(() => {
        this.props.clearOpened();
      }, 30);
    }
  };

  // shuffle starting cards
  componentWillMount = () => {
    this.props.shuffle();
  };

  render() {
    return (
      <div className="game">
        {this.props.cards.map((item, i) => (
          <div
            onClick={e => this.openItem(e, i, item)}
            key={item.index}
            //  style = {item.isOpen ? {backgroundColor: "white"} : {backgroundColor: "black"}}
            style={{
              transform: "rotateY(180deg)"
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    cards: state.cards,
    opened: state.opened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCard: (index, i) => {
      dispatch(openCard(index, i));
    },
    closeCards: () => {
      dispatch(closeCards());
    },
    clearOpened: () => {
      dispatch(clearOpened());
    },
    shuffle: () => {
      dispatch(shuffle());
    }
  };
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Game);
