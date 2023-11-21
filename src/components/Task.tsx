import { CheckCircle, Circle, Trash } from "phosphor-react";
import styles from "./Task.module.css";

import { TaskType } from "../App";

interface TaskProps {
  task: TaskType;
  onFinishTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Task({ task, onDeleteTask, onFinishTask }: TaskProps) {
  return (
    <div className={styles.task} key={task.id}>
      <div>
        <button onClick={() => onFinishTask(task.id)}>
          {task.finished ? <CheckCircle /> : <Circle />}
        </button>
        <p className={task.finished ? styles.textMarked : styles.text}>{task.title}</p>
      </div>

      <button onClick={() => onDeleteTask(task.id)}>
        <Trash />
      </button>
    </div>
  );
}
