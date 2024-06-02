import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const TodoList = ({ initialItems }) => {
    console.log(initialItems, 'initial items');
    const [items, setItems] = useState(initialItems || []);
    const [inputValue, setInputValue] = useState('');
    const [url, setUrl] = useState('');

    const basePath = process.env.NODE_ENV === 'production' ? '/qr_code' : ''; // Use empty basePath for local testing

    const addItem = () => {
        if (inputValue.trim()) {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };


    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    useEffect(() => {
        const query = new URLSearchParams({ items: JSON.stringify(items) }).toString();
        console.log(initialItems, ' this should be initlal items');
        setUrl(`${window.location.origin}${basePath}?${query}`);
    }, [items]);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">vad finns här</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add new item"
                    className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addItem}
                    className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <ul className="list-none p-0">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between p-2 border-b border-gray-300"
                    >
                        <span className="text-gray-800">{item}</span>
                        <button
                            onClick={() => removeItem(index)}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            {url && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">QR Code</h2>
                    <QRCode value={url} />
                </div>
            )}
        </div>
    );
};

export default TodoList;