import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [footer, setFooter] = useState("");
	const [showBtn, setShowBtn] = useState({ state: false, index: 0 });

	//URL as a Variable
	const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/gabrielh";

	useEffect(() => {
		fetchTodo();
	}, []);

	useEffect(() => {
		updateTodo();
	}, [todos]);

	const fetchTodo = () => {
		fetch(apiURL)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				} else {
					alert(
						`Something went wrong, this is the error ${response.status}`
					);
				}
			})
			.then(data => {
				console.log(data);
				setTodos(data);
			})
			.catch(error => console.log("This is an error: ", error));
	};

	const updateTodo = () => {
		fetch(apiURL, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

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
					<span className="item">{item.label} </span>
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
		let userInput = inputValue.trim();
		userInput = { label: inputValue, done: false };
		const newTodoList = [...todos, userInput];
		setTodos(newTodoList);
		console.log("THIS IS THE NEW TODO LIST: ", newTodoList);
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
