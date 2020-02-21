import React,{useState, useEffect} from 'react';
import '../../src/App.css';


const url = 'https://assets.breatheco.de/apis/fake/todos/user/GoatlyGod'

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [init, setInit] = useState([true])
    const [inputValue, setInputValue]= useState('');

    useEffect(() => {
        const fetchGetTodos = () => {
            return fetch(url)
            .then(res => res.json())
            .then(res => {
                return res
            })
            .catch(err => console.log('error:'+err))
        }
        const fetchCreateUser = () => {
            return fetch(url,{
                method: 'POST',
                body: JSON.stringify([{}]),
                headers: {'Content.Type':'application/json'}
            })
            .then(res => res.json())
            .then(res => {
                return res
            })
            .catch(err => console.log('error:'+err))
        }
        const fetchUpdateTodos = () => {
            const todosData = todos.map(todo => {
                return {label: 'todo',done: false}
            })
            return fetch(url,{
                method: 'PUT',
                body: JSON.stringify(todosData),
                headers: {'Content.Type':'application/json'}
            })
            .then(res => res.json())
            .then(res => {
                return res
            })
            .catch(err => console.log('error:'+err))
        }

        // Making GET request, testing is user exits
        if(init === true) {
            fetchGetTodos()
          .then(res => {
            console.log("response: " + JSON.stringify(res));
            // if user does not exist, we get a "msg"
            if (res.msg) {
              // If user does not exists, we'll create it
              console.log("user does not exists");
              fetchCreateUser()
                .then(res => console.log())
            } else {
              console.log("user exists, here is response: " + JSON.stringify(res));
                setTodos(res.map(todo => todo.label)) 
            }
          })
        }
        
      }, [todos]);
    

    const addTodo = newTodoFromInput => {
        if (newTodoFromInput){
            setTodos(prevTodos => [...prevTodos, newTodoFromInput]);
            setInputValue("")
        }
    };
    const deleteTodos = indexToDelete => {
        console.log(indexToDelete);
        setTodos(prevTodos => {
            return prevTodos.filter((value, index) => {
                return indexToDelete !== index;
            })
        })
    }
    

    


    return (
        <div class="bigbox">
                <h1>My TO DO LIST</h1>
            <div className="inputbar input-group mb-3">
                <input type="text" className="form-control" placeholder="Add new todo" aria-label="Add new todo" name={inputValue} value={inputValue} onChange={e => setInputValue(e.target.value)} aria-describedby="button-addon2"></input>
                <div className="input-group-append">
                    <button className="btn btn-success" type="button" onClick={() => {
                        addTodo(inputValue)
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