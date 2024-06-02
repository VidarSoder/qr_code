'use client'
import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';

const Home = () => {
  const [title, setTitle] = useState("vad finns I lådan");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const itemsParam = query.get('items');
    const titleParam = query.get('title');
    if (titleParam) {
      setTitle(titleParam);
    }
    if (itemsParam) {
      try {
        setItems(JSON.parse(itemsParam));
      } catch (e) {
        console.error('Error parsing items from URL', e);
      }
    }
  }, []);

  return <TodoList initialTitle={title} initialItems={items} />;
};

export default Home;