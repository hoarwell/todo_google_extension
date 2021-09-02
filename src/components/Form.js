import React, { useRef } from 'react';
import { dbService } from 'fbase';

const Form = ({ text, setText, todos, setTodos, setNeedRefresh }) => {
    const ref = dbService.collection('todos').doc();
    const inputRef = useRef();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const object = {
            date: Date.now(),
            text: text,
            id: ref.id,
            complete: false,
        }
        dbService.collection("todos").doc(ref.id).set(object)
        .then(() => {
            setNeedRefresh(true);
        })
        .catch((error) => {
            console.log(error);
        });
        setText("");
        inputRef.current.value = "";
    }

    return (
        <div className = "form-container">
            <form onSubmit = { handleSubmit }>
                <p>
                    <input ref = { inputRef } type = "text" onChange = { handleChange } required />
                    <input type = "submit" value = "추가" />
                </p>
            </form>
        </div>
    );
}

export default Form;