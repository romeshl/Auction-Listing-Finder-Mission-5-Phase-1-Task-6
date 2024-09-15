import { useState, useRef } from "react";
import "./App.css";

interface Data { // Data interface for listings
	title: string;
	description: string;
	start_price: number;
	reserve_price: number;
}

function App() {
	const inputRef = useRef<HTMLInputElement>(null); // Ref for input element

	const [text, setText] = useState(""); // Search text

	const [data, setData] = useState<Data | Data[] | null>(null); // Stores the data from the API
	const [errorText, setErrorText] = useState<{ error: string} | null>(null); // Stores the error message

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) { // Sets the text variable as the user types the input
		setText(event.target.value);
	}

	const SelectText = () => { // Selects the text in the input field
		if (inputRef.current) {
			inputRef.current.select();
		}
	};

	async function getData() { // Calls the API with the search text and grab data from the listings collection
    try {
      if (!text) {
        throw new Error("Please enter a search text");
      }
			const response = await fetch(
				`http://localhost:3000/listings/${text}`
			);
			// Check if the response is not OK (non-2xx status codes)
			if (!response.ok) {
				const errorData = await response.json(); // Parse the error message from the response body
				throw new Error(
					`${response.status} - ${errorData.error || "Unknown error"}`
				);
			}
			// If the response is OK, parse the data
			const data = await response.json();
			setData(data);
		} catch (err) {
			// Log the error code and message
			const errorMessage = (err as Error).message;
      setErrorText({ error: errorMessage });
		}
	}

	return (
		<>
			<div
				className="bg-blue-500 my-6 font-mono
     rounded-xl [box-shadow:_4px_4px_5px_rgba(0,0,0,0.2)]
      max-w-[1000px] w-[95%] mx-auto p-4 min-w-[375px]"
			>
				<h1 className="text-4xl text-white w-[100%] text-center [text-shadow:_1px_1px_2px_black]">
					SEARCH LISTING DATA
				</h1>
				<form className="flex w-[80%] m-auto justify-center gap-5 mt-5">
					<input
						ref={inputRef}
						type="text"
						id="name"
						name="name"
						onChange={handleChange}
						className="border border-blue-600 rounded-md w-[50%] active: border-none pl-2 focus: outline-blue-400"
						placeholder="Enter item name or details"
						autoFocus
						autoComplete="off"
					/>
					<button
						className="bg-blue-200 text-blue-800 rounded-md p-3 font-bold [box-shadow:_1px_1px_2px_black]
            hover:bg-blue-300 hover:text-blue-700
            active:bg-blue-900 active:text-white"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							SelectText();
							setData(null);
							getData();
						}}
					>
						SEARCH
					</button>
				</form>
			</div>

			<div className="bg-blue-100 max-w-[1000px] mx-auto mt-2 py-5 rounded-xl max-h-screen overflow-y-scroll min-w-[375px] w-[95%]">
				{data && Array.isArray(data) ? (
					data.map((item, index) => (
						<div
							key={index}
							className="font-mono grid w-[90%] grid-cols-1 m-auto  bg-white gap-2 p-4 rounded-md my-2 border-solid border-2
               border-blue-300 [box-shadow:_4px_4px_5px_rgba(0,0,0,0.2)]
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
					<>
						{errorText && (
							<p className="text-center w-[80%] m-auto">
								{errorText.error}
							</p>
						)}
					</>
				)}
			</div>
		</>
	);
}

export default App;
