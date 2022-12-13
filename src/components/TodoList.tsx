import React from "react"
import SingleTodo from "./SingleTodo"
import { Todo } from "../models/model"
import { Droppable } from "react-beautiful-dnd"

interface Props {
    todos: Array<Todo>
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
    completedTodos: Array<Todo>
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {

    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        >
                            <span className="todos-heading">
                                Active Tasks
                            </span>
                            {todos?.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todos={todos}
                                    todo={todo}
                                    key={todo.id}
                                    setTodos={setTodos}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
                        >
                            <span className="todos-heading">
                                Completed Tasks
                            </span>
                            {completedTodos?.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todos={completedTodos}
                                    todo={todo}
                                    key={todo.id}
                                    setTodos={setCompletedTodos}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default TodoList
