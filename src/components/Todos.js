import React,{useState} from 'react';
import '../../src/App.css';



const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue]= useState('');
    const deleteTodos = indexToDelete => {
        console.log(indexToDelete);
        setTodos(prevTodos => {
            return prevTodos.filter((value, index) => {
                return indexToDelete !== index;
            })
        })
    }
    

    console.log(todos);


    return (
        <div class="bigbox">
                <h1>My TO DO LIST</h1>
            <div className="inputbar input-group mb-3">
                <input type="text" className="form-control" placeholder="Add new todo" aria-label="Add new todo" name={inputValue} value={inputValue} onChange={e => setInputValue(e.target.value)} aria-describedby="button-addon2"></input>
                <div className="input-group-append">
                    <button className="btn btn-success" type="button" onClick={() => {
                        setTodos(prevTodos => [...prevTodos, inputValue])
                        setInputValue("")
                    }
                    }
                    >Add</button>
                </div>
            </div >
            <ul class= "listHolder">
            {todos.map((value, index) => {
                    return <li className="Kidd list-group-item d-flex justify-content-between align-items-center" key={index}>{value}
                        <span type="button" onClick={() => {
                            deleteTodos(index);
                        }}
                        >x</span>
                    </li>
                })}
            </ul>
                <p class= "itemcounter">{todos.length} Items</p>
        </div>
    );
}

export default Todos;