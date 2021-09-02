import { dbService } from 'fbase';
import React, { useState, useRef, useEffect } from 'react';

const List = ({ count, todos, selected, setSelected, setAsking, asking, setNeedRefresh }) => {
    const listRef = useRef();

    const handleClick = (e) => {
        const { dataset } = e.currentTarget;
        setSelected(dataset.id);
    }

    const handleDelete = () => {
        dbService.collection("todos").doc(selected).delete()
        .then(() => {
            console.log(selected, 'deleted successfully');
            setSelected("")
            setNeedRefresh(true);
        })
        .catch((error) => {
            console.error(error.message);
        })
    }

    const handleComplete = () => {
        dbService.collection("todos").doc(selected).update({ complete: true })
        .then(() => {
            console.log(selected, 'updated successfully');
            setSelected("");
            setNeedRefresh(true);
        })
        .catch((error) => {
            console.error(error.message);
        })
    }

    const handleAsking = (e) => {
        const object = {
            status: true,
            type: e.target.name,
        }
        setAsking(object);
    }

    const handleCancelAsking = (e) => {
        e.preventDefault();
        setAsking(false);
        setSelected(null)
        console.log(e)
    }
    
    return (
        <div className = "list-container">
            <ul>
                {
                    todos ? 
                        todos.sort((a, b) => a.date - b.date).map((todo, i) => (
                            <li ref = { listRef } data-id = { todo.id } key = { todo.id } onClick = { handleClick } >
                                <p><small style = {{ textDecorationLine: todo.complete ? "line-through" : "inherit" }}>{ i + 1 }. { todo.text }</small></p>
                                {
                                    (todo.id === selected) ? 
                                    asking.status ? <div className = "asking-container" >
                                                <small>{ asking.type === "complete" ? "완료하셨습니까?" : "해당 사항을 삭제하시겠습니까?" }</small>
                                                <button onClick = { asking.type === "complete" ? handleComplete : handleDelete }>예</button>
                                                <button onClick = { handleCancelAsking }>아니오</button>
                                            </div>  
                                    :
                                    <div className = "menu-container">
                                        <small>
                                            { Math.floor((new Date(Date.now()) - new Date(todo.date)) / 1000 / 60 / 60) }시간&nbsp;
                                            { Math.floor((new Date(Date.now()) - new Date(todo.date)) / 1000 / 60) }분 전에 추가&nbsp;
                                        </small>
                                        <span>
                                            <button name = "complete" disabled = { todo.complete ? true : false } onClick = { handleAsking}>완료</button>
                                            <button name = "delete" onClick = { handleAsking }>삭제</button>
                                            <button name = "cancel" onClick = { handleCancelAsking }>접기</button>
                                        </span>
                                    </div>
                                    : ""
                                }
                            </li>
                        )) : ""
                }
                <p><small>총 { todos.length }개, 완료 { count }개, 남은 할 일 { todos.length - count }개</small></p>
            </ul>
        </div>
    );
}

export default List;