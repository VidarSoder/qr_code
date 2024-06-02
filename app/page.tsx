'use client'
import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const itemsParam = query.get('items');
    if (itemsParam) {
      setItems(JSON.parse(itemsParam));
    }
  }, []);

  return <TodoList initialItems={items} />;
};

export default Home;