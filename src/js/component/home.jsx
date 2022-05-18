import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

export function Home() {
	const [todos, setTodos] = useState([
		"Let the dogs out",
		"Go to work",
		"Do laundry",
	]);

	const url = "https://assets.breatheco.de/apis/fake/todos/user/Alek";
	const fetchTodo = () => {
		fetch(url)
			.then((res) => res.json())
			.then((response) => {
				setTodos(response);
				console.log(response);
			})
			.catch((error) => console.log("there was an error", error));
	};

	const putTodo = () => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) =>
			response.json().then((response) => JSON.stringify(response))
		);
	};

	useEffect(() => {
		fetchTodo();
		putTodo(url, todos);
	}, []);

	// hoverstate from upmostly website, ?: is another way to put if else
	const [isShown, setisShown] = useState(false);

	const todo = todos.map((item, i) => {
		return (
			<div className="content" key={i}>
				<li
					onMouseEnter={() => setisShown({ state: true, index: i })}
					onMouseLeave={() => setisShown({ state: false, index: 0 })}>
					{item.label}
					{isShown.state === true && isShown.index === i ? (
						<button onClick={() => removeItem(i)}>
							<strong>X</strong>
						</button>
					) : (
						""
					)}
				</li>
			</div>
		);
	});

	const removeItem = (index) => {
		const newArray = todos.filter((item, i) => i != index);
		setTodos(newArray);
	};

	// on key down event is when user pushes button down. #13 is enter key
	const newTodos = (onKeyDownEvent) => {
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const newTodo = [...todos, { done: false, label: userInput }];
			setTodos(newTodo);
			onKeyDownEvent.target.value = "";
		}
	};

	return (
		<div className="container">
			<h1>To Do List</h1>
			<input
				onKeyDown={newTodos}
				type="text"
				id="fname"
				placeholder="Add a task"
				name="fname"></input>
			<div>
				<ul>{todo}</ul>
				<div>
					<ul className="tasks">{todo.length} task(s) left</ul>
				</div>
			</div>
		</div>
	);
}
