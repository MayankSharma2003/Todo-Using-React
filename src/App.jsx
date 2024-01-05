import { useEffect, useState } from 'react'
import TodoItem from './components/todoItem'
import TakeItem from './components/form/input'
import style from './mainstyle.module.css'
import { saveTodo,getTodos,updateCb } from '../apicall/todo'

const userName = prompt("(REQUIRED)Enter your name : ");

function App() {
  const [data, setData] = useState([]);
  const [inputValue,setInputValue]=useState("");

  useEffect(() => {
      getTodos(userName)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.log(err))
  }, [])

  // function CreateTodo(todo){
    
  // }

  function cb_update(id) {
          const idx = data.findIndex(todo => todo.id == id)
          // const arr = [...data]
          // arr[idx].completed = !arr[idx].completed
          // setData(arr)
          const arr = [...data]
          updateCb(arr[idx])
          .then(()=>{
            arr[idx].completed = !arr[idx].completed
            setData(arr)
          })
          .catch((err)=>{
            console.log(err);
          })
  }

  function todoRemove(id){
    let arr = [...data]
    // let arrr = arr.filter(todo=>{
    //   return todo.id!=id
    // })
    // setData(arrr)
    deleteTodo(id)
    .then(()=>{
      let arrr = arr.filter(todo => {
        return todo.id != id
      })
      setData(arrr)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  function onChangeInput(ev){
    if (ev.target.value == "" && ev.key == "Enter"){
        alert("Empty todo can not enter")
      }
      else if(ev.key=="Enter"){
        console.log(ev.target.value);
        let id = Math.random();
        let obj = {id : id, completed : false, title : ev.target.value, userName : userName}
        // const arr = [...data]
        // arr.push(obj);
        // setData(arr)
        saveTodo(obj)
        .then(()=>{
          const arr = [...data]
          arr.push(obj);
          setData(arr)
        })
        .catch((err)=>{
          console.log(err);
        })
      }
  }
  return (
    <div className={style.container}>
      <div className={style.left}>
        {/* {console.log(data[0])} */}
        {data.map(val => <TodoItem data={val} cb_update={cb_update} todoRemove={todoRemove} />)}
      </div>
      <div className={style.right}>
        <ul>{<TakeItem inputValue={inputValue} onChangeInput={onChangeInput} />}</ul>
        
      </div>
    </div>        
  )
}



export default App
