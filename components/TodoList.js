import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const TodoList = ({ initialTitle = "vad finns I lådan", initialItems = [] }) => {
    const [title, setTitle] = useState(initialTitle);
    const [items, setItems] = useState(initialItems || []);
    const [inputValue, setInputValue] = useState('');
    const [url, setUrl] = useState('');

    const basePath = process.env.NODE_ENV === 'production' ? '/qr_code' : '/qr_code';

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
        setTitle(initialTitle);
    }, [initialItems, initialTitle]);

    useEffect(() => {
        const query = new URLSearchParams({ title, items: JSON.stringify(items) }).toString();
        setUrl(`${window.location.origin}${basePath}?${query}`);
    }, [title, items]);

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="text-3xl font-bold mb-6 text-gray-800 text-center p-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col md:flex-row mb-6 w-full max-w-md">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add new item"
                    className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow md:flex-grow-0 md:w-2/3"
                />
                <button
                    onClick={addItem}
                    className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 mt-2 md:mt-0 md:ml-2"
                >
                    Add
                </button>
            </div>
            <ul className="list-none p-0 w-full max-w-md">
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
                <div className="mt-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-2">QR Code</h2>
                    <div className="flex justify-center">
                        <QRCode value={url} size={120} />
                    </div>
                </div>
            )}
            {url && (
                <button
                    onClick={handleCopy}
                    className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    Copy Link
                </button>
            )}
        </div>
    );
};

export default TodoList;