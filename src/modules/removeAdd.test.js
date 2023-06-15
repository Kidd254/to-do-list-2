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

/*describe('clear all completed', () => {
  // Arrange
  const task1 = new Todo('test1', true, 1);
  const task2 = new Todo('test2', true, 2);
  const task3 = new Todo('test3', true, 3);
  const task4 = new Todo('test3', true, 4);
  const modifiedArray = [task1, task2, task3, task4];
  test('clear All Four(4) completed tasks in local storage', () => {
    // Act
    const newUpdatedArr = Todo.clearAllCompletedTask(modifiedArray);
    // Assert
    expect(newUpdatedArr).toHaveLength(0);
  });

  test('clear 2 completed tasks in local storage from 4 tasks', () => {
    // Arrange
    task4.completed = false;
    task3.completed = false;
    const modifiedArray = [task1, task2, task3, task4];
    // Act
    const newUpdatedArr = Todo.clearAllCompletedTask(modifiedArray);
    // Assert
    expect(newUpdatedArr).toHaveLength(2);
  });
});*/
