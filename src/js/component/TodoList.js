import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [footer, setFooter] = useState("");
	const [showBtn, setShowBtn] = useState({ state: false, index: 0 });

	// const fetchTodo = () => {
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/gabrielh")
	// 		.then(response => response.json())
	// 		.then(todos => console.log(todos))
	// 		.catch(error => console.log(error));
	// };

	// useEffect(() => {
	// 	fetchTodo();
	// }, []);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	useEffect(() => {
		if (todos.length === 0) {
			setFooter("Items added, add something to do.");
		} else if (todos.length === 1) {
			setFooter("Item Left!");
		} else {
			setFooter("Items Left!");
		}
	}, [todos.length]);

	const list = todos.map((item, i) => {
		const style = { color: "purple", fontSize: "1.5em" };
		return (
			<>
				<hr />{" "}
				<div
					key={i}
					className="todo"
					onMouseEnter={() => setShowBtn({ state: true, index: i })}
					onMouseLeave={() => setShowBtn({ state: false, index: 0 })}>
					<span className="item" key={i}>
						{item}{" "}
					</span>
					{showBtn.state == true && showBtn.index == i ? (
						<FaTrash style={style} onClick={() => removeTodo(i)} />
					) : (
						""
					)}
				</div>
			</>
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
		<div className="mainDiv">
			<h1>The TODO List</h1>
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
		</div>
	);
};

export { TodoList };
