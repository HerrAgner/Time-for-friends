import React from "react";

export const Store = React.createContext();

const initialState = {
  people: [],
  language: { name: "English", code: "en" }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PEOPLE":
      return { ...state, people: action.payload };
    case "LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
