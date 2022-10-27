import React, { useState, useEffect, useRef } from 'react';

const intToString = (num) => {
  return String(num).padStart(2, "0");
};

const Timer = ({ block, rent_duration, rent_block, grace_period }) => {
  let count = useRef(Number(rent_duration) + Number(rent_block) + Number(grace_period) -  Number(block));
  const interval = useRef(null);
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  useEffect(() => {
    if (block !== 2**256/10 && grace_period !== 0) {
        count.current = Number(rent_duration) + Number(rent_block) + Number(grace_period) -  Number(block)
    }
  }, [block, grace_period])

  useEffect(() => {
    interval.current = setInterval(() => {
        count.current -= 0.5;
      setDay(intToString(parseInt(count.current / 3600 / 24)))
      setHour(intToString(parseInt(count.current % (3600 * 24) / 3600)));
      setMinute(intToString(parseInt((count.current % 3600) / 60)));
      setSecond(intToString((count.current % 60)));
    }, 1000);
  }, [count]);

  return (
    <div>
      {day} 일 {hour} 시간 {minute} 분 {second} 초 남았습니다.
    </div>
  );
};

export default Timer;