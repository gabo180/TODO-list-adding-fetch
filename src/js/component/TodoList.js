import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RiCloseCircleLine } from "react-icons/ri";

const TodoList = () => {
	const [todos, setTodos] = useState(["Gabriel", "Samuel", "Daniel"]);
	const [inputValue, setInputValue] = useState("");

	const list = todos.map((item, index) => {
		return (
			<li key={index}>
				{item}{" "}
				<div className="icons">
					{" "}
					<RiCloseCircleLine />{" "}
				</div>
			</li>
		);
	});

	const addTodo = e => {
		e.preventDefault();
		const newTodoList = [...todos, inputValue];
		setTodos(newTodoList);
		setInputValue("");
	};

	return (
		<>
			<div>
				<form onSubmit={e => addTodo(e)}>
					<input
						placeholder="What needs to be done?"
						type="text"
						id="inputId"
						name="inputName"
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
					/>{" "}
					<button type="submit" id="addButton">
						Add
					</button>
					<ul>{list}</ul>
				</form>
			</div>
		</>
	);
};

export { TodoList };
