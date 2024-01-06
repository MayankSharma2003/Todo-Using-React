import style from './stylee.module.css'

export default function TakeItem({inputValue,onChangeInput}) {

    function m(e){
        onChangeInput(e);
        if (e.key == "Enter") {
            e.target.value="";
        }
    }

    return (
        <>
            <h2 className={style.h2}>Enter the todo : </h2>
            <input className={style.inputbox} type="text" inputValue={inputValue} onKeyDown={m} id="inputbox" placeholder='Enter the todo.....' />
        </>
    )
}