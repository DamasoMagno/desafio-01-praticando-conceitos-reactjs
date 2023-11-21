import { ChangeEvent, FormEvent } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./FormAddTask.module.css";

interface FormAddTaskProps {
  onAddNewTask: (event: FormEvent) => void;
  onSetTask: (event: ChangeEvent<HTMLInputElement>) => void;
  task: string;
}

export function FormAddTask({
  onAddNewTask,
  onSetTask,
  task,
}: FormAddTaskProps) {
  const newTaskIsDisabled = task.length === 0;

  return (
    <form className={styles.createTask} onSubmit={onAddNewTask}>
      <input
        placeholder="Adicione uma nova tarefa"
        onChange={onSetTask}
        value={task}
      />

      <button disabled={newTaskIsDisabled}>
        Criar <PlusCircle />
      </button>
    </form>
  );
}
