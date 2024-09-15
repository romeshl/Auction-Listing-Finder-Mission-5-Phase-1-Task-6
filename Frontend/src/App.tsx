import { useState } from "react";
import "./App.css";

interface Data {
	title: string;
	description: string;
	start_price: number;
	reserve_price: number;
	// Add other properties as needed
}

function App() {
	const [text, setText] = useState("");

	const [data, setData] = useState<Data | Data[] | null>(null);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setText(event.target.value);
		console.log(text);
	}

	async function getData() {
		try {
			const response = await fetch(
				`http://localhost:3000/listings/${text}`
			);
			const data = await response.json();
			setData(data);
			console.log(data);
			console.log(data.length);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div
				className="bg-blue-500 my-6 font-mono
     rounded-xl [box-shadow:_4px_4px_5px_rgba(0,0,0,0.2)]
      max-w-[1000px] mx-auto p-4 min-w-[375px]"
			>
				<h1 className="text-4xl text-white w-[100%] text-center [text-shadow:_1px_1px_2px_black]">
					SEARCH LISTING DATA
				</h1>
				<form className="flex w-[80%] m-auto justify-center gap-5 mt-5">
					<input
						type="text"
						id="name"
						name="name"
						onChange={handleChange}
						className="border border-blue-600 rounded-md w-[50%] active: border-none"
            placeholder="Enter item name or details"
            autoFocus
					/>
					<button
						className="bg-blue-200 text-blue-800 rounded-md p-3 font-bold [box-shadow:_1px_1px_2px_black]
            hover:bg-blue-300 hover:text-blue-700
            active:bg-blue-900 active:text-white"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							getData();
						}}
					>
						SEARCH
					</button>
				</form>
			</div>

			<div className="bg-blue-100 max-w-[1000px] mx-auto mt-2 py-5 rounded-xl max-h-screen overflow-y-scroll min-w-[375px]">
				{data && Array.isArray(data) ? (
					data.map((item, index) => (
						<div
							key={index}
							className="font-mono grid w-[90%] grid-cols-1 m-auto  bg-white gap-2 p-4 rounded-md my-2 border-solid border-2 border-blue-300 [box-shadow:_4px_4px_5px_rgba(0,0,0,0.2)]
      sm:grid-cols-[1fr_2fr]
      md:grid-cols-[1fr_2fr_1fr_2fr]"
						>
							<h2
								key={index}
								className="bg-blue-300 text-blue-900 sm:text-right rounded-md p-2 font-bold"
							>
								TITLE:
							</h2>
							<p
								key={index}
								className="bg-blue-100 rounded-md p-2"
							>
								{item.title}
							</p>
							<h2
								key={index}
								className="bg-blue-300 text-blue-900 sm:text-right rounded-md p-2 font-bold"
							>
								DESCRIPTION:
							</h2>
							<div
								key={index}
								className="bg-blue-100 rounded-md p-2 "
							>
								{item.description}
							</div>
							<h2
								key={index}
								className="bg-blue-300 text-blue-900 sm:text-right rounded-md p-2 font-bold"
							>
								START PRICE:
							</h2>
							<div
								key={index}
								className="bg-blue-100  rounded-md p-2"
							>
								{item.start_price}
							</div>
							<h2
								key={index}
								className="bg-blue-300 text-blue-900  sm:text-right rounded-md p-2 font-bold"
							>
								RESERVE PRICE:
							</h2>
							<div
								key={index}
								className="bg-blue-100  rounded-md p-2"
							>
								{item.reserve_price}
							</div>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</>
	);
}

export default App;
