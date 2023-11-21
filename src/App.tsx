import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "./components/Task";
import { FormAddTask } from "./components/FormAddTask";

import styles from "./styles/App.module.css";
import "./styles/global.css";

import logo from "./assets/Logo.svg";

export interface TaskType {
  id: string;
  title: string;
  finished: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState("");

  const tasksFinished = tasks.filter((task) => task.finished).length;
  const totalTasks = tasks.length;

  function handleSetTask(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    if (!task) return;

    const newTask: TaskType = {
      id: uuidv4(),
      title: task,
      finished: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
    setTask("");
  }

  function handleFinishTask(taskId: string) {
    const findAndSetTaskAsFinished = tasks.map((task) => {
      return task.id === taskId
        ? {
            ...task,
            finished: !task.finished,
          }
        : task;
    });

    setTasks(findAndSetTaskAsFinished);
  }

  function handleDeleteTask(taskId: string) {
    const findAndSetTaskAsFinished = tasks.filter((task) => task.id !== taskId);

    setTasks(findAndSetTaskAsFinished);
  }

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo ToDoList" />
      </header>

      <main className={styles.content}>
        <FormAddTask
          onAddNewTask={handleAddNewTask}
          onSetTask={handleSetTask}
          task={task}
        />

        <div className={styles.taskList}>
          <div className={styles.tasksResume}>
            <div>
              Tarefas criadas
              <span>{totalTasks}</span>
            </div>
            <div>
              Concluídas

              {tasksFinished > 0 ? (
                <span>
                  {tasksFinished} de {totalTasks}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
          </div>

          <div>
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDeleteTask={handleDeleteTask}
                onFinishTask={handleFinishTask}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
