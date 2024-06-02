'use client'
import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const itemsParam = query.get('items');
    if (itemsParam) {
      try {
        console.log(itemsParam);
        setItems(JSON.parse(itemsParam));
      } catch (e) {
        console.error('Error parsing items from URL', e);
      }
    }
  }, []);

  return <TodoList initialItems={items} />;
};

export default Home;