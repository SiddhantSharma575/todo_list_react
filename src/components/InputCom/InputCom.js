import React, { useEffect, useState } from "react";
import "./inputCom.css";

const InputCom = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [updatedText, setupdatedText] = useState("");
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  console.log(items);
  const addItem = (e) => {
    e.preventDefault();
    localStorage.clear();
    const savedItems = localStorage.getItem("todos");
    setItems(savedItems ? JSON.parse(savedItems) : []);
    if (item !== "") {
      setItems([
        ...items,
        {
          id: items.length + 1,
          text: item,
        },
      ]);
    }
    setItem("");
  };

  const handleDelte = (id) => {
    const resultItem = items.filter((todo) => {
      return todo.id !== id;
    });
    setItems(resultItem);
  };

  const handleUpdate = (id) => {
    setUpdateId(id);
    setEditing(true);
  };

  const updateTextHandle = (id) => {
    const updatedItem = {
      id: id,
      text: updatedText,
    };
    const updatedItems = items.map((item) => {
      return item.id === id ? updatedItem : item;
    });
    setItems(updatedItems);
    setEditing(false);
    setupdatedText("");
  };

  return (
    <>
      {isEditing ? (
        <div>
          <div className="update_cont">
            <input
              value={updatedText}
              onChange={(e) => setupdatedText(e.target.value)}
              type="text"
              nsame=""
              id=""
            />
            <button
              onClick={() => updateTextHandle(updateId)}
              className="update_btn"
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="input_container">
            <h3>Add an Item</h3>
            <div>
              <input
                value={item}
                onChange={(e) => setItem(e.target.value)}
                type="text"
                className="input_take"
                placeholder="Enter an Item"
              />
              <button onClick={addItem} className="btn_add">
                Add
              </button>
            </div>
          </div>
          <div className="list_item_container">
            <ul>
              {items.map((item) => (
                <div className="inside_item">
                  <li>{item.text}</li>
                  <button onClick={() => handleDelte(item.id)}>❌</button>
                  <button onClick={() => handleUpdate(item.id)}>🖊️</button>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default InputCom;
