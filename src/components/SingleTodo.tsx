import React from "react"
import { Todo } from "../models/model"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd"

type Props = {
    index: number
    todo: Todo
    todos: Array<Todo>
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }: Props) => {
  
    const [edit, setEdit] = React.useState<boolean>(false)

    const [editTodo, setEditTodo] = React.useState<string>(todo.todo)

    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? 
            { ...todo, isDone: !todo.isDone } 
            : 
            todo
        ))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEditOnOff = () => {
        if (!edit && !todo.isDone)
            setEdit(!edit)
    }

    const handleEdit = (event: React.FormEvent, id: number) => {
        event.preventDefault()
        setTodos(todos.map(todo => 
            todo.id === id ? 
            { ...todo, todo: editTodo } 
            : 
            todo
        ))
        setEdit(false)
    }

    return (
        <Draggable 
            draggableId={todo.id.toString()} 
            index={index}
        >
            {
                (provided, snapshot) => (
                    <form
                        onSubmit={(event) => handleEdit(event, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`todos-single ${snapshot.isDragging ? "drag" : ""}`}
                    >
                    {
                        edit ? 
                        <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(event) => setEditTodo(event.target.value)}
                            className="todos-single--text"
                        />
                        : todo.isDone ? 
                        <s className="todos-single--text">{todo.todo}</s>
                        : 
                        <span className="todos-single--text">{todo.todo}</span>
                    }
                        <div>
                            <span
                                onClick={handleEditOnOff}
                                className="icon"
                            >
                                <AiFillEdit />
                            </span>
                            <span  
                                onClick={() => handleDelete(todo.id)}
                                className="icon"
                            >
                                <AiFillDelete />
                            </span>
                            <span 
                                onClick={() => handleDone(todo.id)}
                                className="icon" 
                            >
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo
