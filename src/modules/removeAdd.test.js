/**
 * @jest-environment jsdom
 */

import Todo from './todo.js';
import { appendToDOM, removeFromDOM, removeAllCompletedFromDOM } from './changeDom.js';

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
    const myTask = new Todo('Example Task', false, 1);
    const testArray = myTask.updateTodo({ description: 'test', completed: false, index: 1 });
    const { description } = testArray[0];
    expect(description).toEqual(taskArr[0].description);
  });

  test('task description is updated', () => {
    const myTask = new Todo('Example Task', false, 1);
    const testArray = myTask.updateTodo({ description: 'updatedDescription', completed: false, index: 1 });
    const { description } = testArray[0];
    expect(description).toBe('updatedDescription');
  });
});

// test for completion update using check box
describe('edit task completion using  checkbox', () => {
  it('edits a task checkbox in local storage', () => {
    // Arrange
    const completedTask = { ...myTodo };
    completedTask.completed = true;
    const incompleteTask = { ...myTodo };
    incompleteTask.completed = false;

    // Act
    const myTask = new Todo(incompleteTask);
    const modifiedArray = myTask.updateTodo(completedTask);
    const completedTaskArray = modifiedArray.filter(
      (e) => e.index === completedTask.index,
    );
    const { completed } = completedTaskArray[0];

    // Assert
    expect(completed).toBeTruthy();
    expect(completed).not.toBeFalsy();
  });
});

describe('clear all completed', () => {
  // Arran
  const taskList = [
    {
      description: 'task 1',
      completed: true,
      index: 0,
    },
    {
      description: 'task 2',
      completed: true,
      index: 1,
    },
    {
      description: 'task 3',
      completed: false,
      index: 2,
    },
  ];
  test('clear All 2 completed tasks in local storage', () => {
    // Act
    const myTask = new Todo();

    const newUpdatedArr = myTask.clearAllCompletedTask(taskList);
    // Assert
    expect(newUpdatedArr).toHaveLength(1);
  });
});

test('clear all completed tasks in DOM', () => {
  document.body.innerHTML = `
    <div>
      <ul id="taskList">
        <li id="1" class='completed'></li>
        <li id="2" class='completed'></li>
        <li id="3"></li>
        <li id="4"></li>
      </ul>
    </div>
    `;
  const taskList = document.querySelectorAll('#taskList li');
  removeAllCompletedFromDOM(taskList);
  const remainList = document.querySelectorAll('#taskList li');
  expect(remainList).toHaveLength(2);
});
