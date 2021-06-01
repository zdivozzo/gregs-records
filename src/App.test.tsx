import React from "react";
import {
  fireEvent,
  render,
  screen
} from "@testing-library/react";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducers from "./reducers";

let container;

// Create a real redux store
const store = createStore(appReducers, {
  records: [
    {
      album_title: "Cardigan Letterpress Scenester",
      year: "1967",
      condition: "poor",
      artist: 0,
      id: 1,
      fav: false,
    },
    {
      album_title: "Sriracha Vinegar Disrupt",
      year: "1964",
      condition: "poor",
      artist: 1,
      id: 2,
      fav: false,
    },
    {
      album_title: "Heirloom Twee Literally",
      year: "1923",
      condition: "very_good",
      artist: 2,
      id: 3,
      fav: false,
    },
  ],
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test("app renders", () => {
  expect(screen.getByText(/Greg's Record Stash/i)).toBeInTheDocument();
});

test("app shows three records", () => {
  expect(screen.queryAllByTestId("record-card")).toHaveLength(3);
});

test("clicking on plus button opens up modal to add new record", async () => {
  fireEvent.click(screen.getByTestId("add-record"));
  expect(await screen.findByText("Add a Record")).toBeInTheDocument();
});

test("clicking on edit icon opens up modal to edit record", async () => {
  fireEvent.click(screen.queryAllByTestId("edit-record")[0]);
  expect(await screen.findByText("Edit a Record")).toBeInTheDocument();
});

test("clicking on delete icon deletes record", async () => {
  fireEvent.click(screen.queryAllByTestId("delete-record")[0]);
  expect(
    screen.queryByText("Cardigan Letterpress Scenester")
  ).not.toBeInTheDocument();
  expect(screen.queryAllByTestId("record-card")).toHaveLength(2);
});