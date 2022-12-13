import React from "react"
import "./styles.css"

interface Props {
    todo: string
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (event: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
    
    const inputRef = React.useRef<HTMLInputElement>(null)

    return (
        <form
            onSubmit={(event) => {
                handleAdd(event)
                inputRef.current?.blur()
            }}
            className="input"
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter a Task"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
                className="input-box"
            />
            <button 
                type="submit" 
                className="input-submit"
            >
                GO
            </button>
        </form>
    )
}

export default InputField
