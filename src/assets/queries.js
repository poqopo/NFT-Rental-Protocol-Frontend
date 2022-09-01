import axios from 'axios'
import { useEffect, useState } from "react";

function Query() {
  const [database, setDatabase] = useState([])
  const fetchItem = async() => {
    try {
      const response = await axios.get('http://localhost:4000/api/NFTinfo');
      console.log(JSON.stringify(response.data))
      console.log('fetch Items');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchItem();
  } ,[])

  return database;
}

export default Query;
