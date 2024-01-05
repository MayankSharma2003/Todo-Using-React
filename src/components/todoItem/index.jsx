import style from './style.module.css'

export default function TodoItem({ data, cb_update , todoRemove}) {

    function markDone(e) {
        console.log(data);
        cb_update(data.id)
    }

    function removeIt(e){
        todoRemove(data.id)
    }
    return (
        <div className={style.todoItem}>
            <li style={style.li}>
                {(data.completed) ? <strike><p>{data.title}</p></strike> : <p>{data.title}</p>}
                <input type="checkbox" className={style.checkbox} checked={data.completed} onChange={markDone} />
                <span   style={style.span} onClick={removeIt}>&#10006;</span>
            </li>
            <hr/>
        </div>
    )
}