import React, { useState, useEffect } from 'react';

const Clock = ({ time, setTime }) => {
    const getTime = () => {
        setTime(Date.now());
    }

    const tick = () => {
        let interval = setInterval(() => {
            getTime();
        }, 100)

        return () => clearInterval(interval);
    }

    useEffect(() => {
        tick();
    })

    return (
        <p><small>{ new Date(time).toLocaleString() }</small></p>
    );
}

export default Clock;