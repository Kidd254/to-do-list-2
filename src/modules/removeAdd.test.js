/**
 * @jest-environment jsdom
 */

import Todo from './todo.js';
import { appendToDOM, removeFromDOM } from './changeDom.js';

const newElement = document.createElement('li');
const myTodo = new Todo('Example Task', false, 1);
document.body.innerHTML = '<div><ul id="taskList"></ul></div>';

describe('add task', () => {
  test('add task to storage', () => {
    const updatedTodos = myTodo.addTodo();
    expect(updatedTodos).toContainEqual([myTodo]);
  });
  appendToDOM(newElement);
  test('append newElement to Dom', () => {
    const taskList = document.querySelectorAll('#taskList li');
    expect(taskList).toHaveLength(1);
  });
});
