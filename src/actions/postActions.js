export const openCard = (index, i) => {
  return {
    type: "OPEN_CARD",
    i
  };
};

export const compareCards = () => {
  return {
    type: "COMPARE_CARDS"
  };
};

export const clearOpened = () => {
  return {
    type: "CLEAR_OPENED"
  };
};

export const shuffle = () => {
  return {
    type: "SHUFFLE"
  };
};
