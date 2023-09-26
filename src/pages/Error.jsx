import { useRouteError } from "react-router-dom";

function ErrorPage() {
	const err = useRouteError();
	return (
		<>
			<main>
				<h1>{err.message}</h1>
				<h1>{err.statusText}</h1>
			</main>
		</>
	);
}

export default ErrorPage;
