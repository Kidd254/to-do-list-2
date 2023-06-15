/**
 * @jest-environment jsdom
 */

import Todo from './todo.js';
import { appendToDOM, removeFromDOM } from './changeDom.js';

const newElement = document.createElement('li');
const myTodo = new Todo('Example Task', false, 1);
document.body.innerHTML = '<div><ul id="taskList"></ul></div>';

const updatedTodos = myTodo.addTodo();
describe('add task', () => {
  describe('add Task', () => {
    test('add task.completed to storage', () => {
      expect(updatedTodos[0].completed).toBe([myTodo][0].completed);
    });

    test('add task.description to storage', () => {
      expect(updatedTodos[0].description).toBe([myTodo][0].description);
    });
    test('add task.index to storage', () => {
      expect(updatedTodos[0].index).toBe([myTodo][0].index);
    });
  });

  appendToDOM(newElement);
  test('append newElement to Dom', () => {
    const taskList = document.querySelectorAll('#taskList li');
    expect(taskList).toHaveLength(1);
  });
});

// test for delete
describe('delete task', () => {
  test('deletes a task', () => {
    expect(updatedTodos[0].index).toStrictEqual(1);
  });
  test('deletes a task element in the dom', () => {
    removeFromDOM(newElement);
    const taskList = document.querySelectorAll('#taskList li');
    expect(taskList).toHaveLength(0);
  });
});

describe('Edit task description', () => {
  test('task element to be updated is being sent', () => {
    const taskArr = [{ description: 'test', completed: false, index: 1 }];
    const myTodo = new Todo('Example Task', false, 1);
    const testArray = myTodo.updateTodo({ description: 'test', completed: false, index: 1 });
    const { description } = testArray[0];
    expect(description).toEqual(taskArr[0].description);
  });

  test('Update task different description', () => {
    const taskArr = [
      { description: 'other-description', completed: false, index: 1 },
    ];
    const myTodo = new Todo('Example Task', false, 1);
    const testArray = myTodo.updateTodo({ description: 'other-description', completed: false, index: 1 });
    const { description } = testArray[0];
    expect(description).not.toBe(taskArr[0].description);
  });

  test('task description is updated', () => {
    const myTodo = new Todo('Example Task', false, 1);
    const testArray = myTodo.updateTodo({ description: 'updatedDescription', completed: false, index: 1 });
    const { description } = testArray[0];
    expect(description).toBe('updatedDescription');
  });
});
