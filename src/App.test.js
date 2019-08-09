import React from 'react';
import * as rtl from '@testing-library/react';
import * as dtl from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(rtl.cleanup);

it('renders without crashing', () => {
 const wrapper = rtl.render(<App />);

 wrapper.getByText(/Home/);
 wrapper.getByText(/Inning/);
 wrapper.getByText(/Guest/);

 wrapper.getByText(/Balls:/);
 wrapper.getByText(/Strikes:/);
 wrapper.getByText(/Outs:/);

 const container = document.body;

 expect(dtl.getByTestId(container,"strikeCount")).toHaveTextContent("0");
 expect(dtl.getByTestId(container,"ballCount")).toHaveTextContent("0");
 expect(dtl.getByTestId(container,"outCount")).toHaveTextContent("0");
 expect(dtl.getByTestId(container,"runCountHome")).toHaveTextContent("0");
 expect(dtl.getByTestId(container,"runCountAway")).toHaveTextContent("0");
 expect(dtl.getByTestId(container,"inningCount")).toHaveTextContent("1");


});

it('increments counters', ()=>{
  const wrapper = rtl.render(<App />);
  const container = document.body;

  dtl.fireEvent.click(wrapper.getByText("Add Ball"));
  expect(dtl.getByTestId(container,"ballCount")).toHaveTextContent("1");

  dtl.fireEvent.click(wrapper.getByText("Add Foul"));
  expect(dtl.getByTestId(container,"strikeCount")).toHaveTextContent("1");

  dtl.fireEvent.click(wrapper.getByText("Add Strike"));
  expect(dtl.getByTestId(container,"strikeCount")).toHaveTextContent("2");

  dtl.fireEvent.click(wrapper.getByText("Add Out"));
  expect(dtl.getByTestId(container,"outCount")).toHaveTextContent("1");
  expect(dtl.getByTestId(container,"ballCount")).toHaveTextContent("0");
  expect(dtl.getByTestId(container,"strikeCount")).toHaveTextContent("0");

  dtl.fireEvent.click(wrapper.getByText("Add Ball"));
  dtl.fireEvent.click(wrapper.getByText("Add Ball"));
  dtl.fireEvent.click(wrapper.getByText("Add Ball"));
  expect(dtl.getByTestId(container,"ballCount")).toHaveTextContent("3");

  dtl.fireEvent.click(wrapper.getByText("Add Ball"));
  expect(dtl.getByTestId(container,"ballCount")).toHaveTextContent("0");

  dtl.fireEvent.click(wrapper.getByText("Add Foul"));
  dtl.fireEvent.click(wrapper.getByText("Add Foul"));
  dtl.fireEvent.click(wrapper.getByText("Add Foul"));
  expect(dtl.getByTestId(container,"strikeCount")).toHaveTextContent("2");
  
  dtl.fireEvent.click(wrapper.getByText("Hit"));
  expect(dtl.getByTestId(container,"ballCount")).toHaveTextContent("0");
  expect(dtl.getByTestId(container,"strikeCount")).toHaveTextContent("0");

  dtl.fireEvent.click(wrapper.getByText("Run"));
  expect(dtl.getByTestId(container,"runCountHome")).toHaveTextContent("1");

  dtl.fireEvent.click(wrapper.getByText("Add Out"));
  expect(dtl.getByTestId(container,"outCount")).toHaveTextContent("2");

  dtl.fireEvent.click(wrapper.getByText("Add Out"));
  expect(dtl.getByTestId(container,"outCount")).toHaveTextContent("0");

  dtl.fireEvent.click(wrapper.getByText("Run"));
  expect(dtl.getByTestId(container,"runCountAway")).toHaveTextContent("1");

  dtl.fireEvent.click(wrapper.getByText("Add Out"));
  dtl.fireEvent.click(wrapper.getByText("Add Out"));
  dtl.fireEvent.click(wrapper.getByText("Add Out"));
  expect(dtl.getByTestId(container,"inningCount")).toHaveTextContent("2");

});