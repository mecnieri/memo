import content from "../data/cards";

const initState = {
  cards: content,
  opened: []
};

const rootReducer = (state = initState, action) => {
  if (action.type === "OPEN_CARD") {
    const cards = state.cards.map((item, j) => {
      if (j === action.i) {
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
      opened: [...state.opened, state.cards[action.i]]
    };
  }
  if (action.type === "CLOSE_CARDS") {
    const cards = state.cards.map((item, j) => {
      if (
        item.index === state.opened[0].index ||
        item.index === state.opened[1].index
      ) {
        return {
          value: item.value,
          index: item.index,
          isOpen: false
        }
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
      opened: []
    };
  }
  if (action.type === "CLEAR_OPENED") {
    return {
      cards: state.cards,
      opened: []
    };
  }
  if (action.type === "SHUFFLE") {
    content.sort(() => Math.random() - 0.5);
    return {
      cards: content,
      opened: []
    };
  }
  return state;
};

export default rootReducer;
