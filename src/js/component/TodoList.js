import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { RiCloseCircleLine } from "react-icons/ri";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [footer, setFooter] = useState("");

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	useEffect(() => {
		if (todos.length === 0) {
			setFooter("Items added, add something todo.");
		} else if (todos.length === 1) {
			setFooter("Item Left!");
		} else {
			setFooter("Items Left!");
		}
	}, [todos.length]);

	const list = todos.map((item, index) => {
		return (
			<div key={index} className="todo">
				<div className="item" key={index}>
					{item}{" "}
				</div>
				<div className="remove=icon">
					{" "}
					<RiCloseCircleLine onClick={() => removeTodo(index)} />{" "}
				</div>
			</div>
		);
	});

	const removeTodo = index => {
		const newArray = todos.filter((item, i) => i != index);
		setTodos(newArray);
	};

	const addTodo = e => {
		e.preventDefault();
		const userInput = inputValue.trim();
		const newTodoList = [...todos, userInput];
		setTodos(newTodoList);
		setInputValue("");
	};

	return (
		<>
			<div className="todoDiv">
				<form onSubmit={e => addTodo(e)} className="todoForm">
					<input
						placeholder="What needs to be done?"
						type="text"
						id="inputId"
						name="inputName"
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						ref={inputRef}
					/>{" "}
					<button type="submit" id="addButton">
						Add
					</button>
					{list}
					<hr />
					<div className="footer">
						{todos.length} {footer}
					</div>
				</form>
			</div>
		</>
	);
};

export { TodoList };
