// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

// 初期化
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  // コンポーネント描画のための、divを作る
  const container = document.createElement('div');

  // 🐨 append the div to document.body (💰 document.body.append)
  // 作ったコンテナdivを、bodyに追加(Q: なんで？→表示するため)
  document.body.append(container);

  // 🐨 use createRoot to render the <Counter /> to the div
  const root = createRoot(container);
  act(()=> root.render(<Counter />))
  console.log(document.body.innerHTML);

  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrementElement, incrementElement] = container.querySelectorAll('button');
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const messageElement = container.firstChild.querySelector('div')
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(messageElement.textContent).toBe('Current count: 0');
  // 🐨 click the increment button (💰 act(() => increment.click()))
  // 🐨 assert the message.textContent
  act(() => incrementElement.click())
  expect(messageElement.textContent).toBe('Current count: 1')
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // 🐨 assert the message.textContent
  act(() => decrementElement.click())
  expect(messageElement.textContent).toBe('Current count: 0')
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
