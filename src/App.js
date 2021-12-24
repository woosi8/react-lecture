import {
	Navbar,
	Container,
	Nav,
	NavDropdown,
	Button,
	Card,
} from "react-bootstrap";
import "./App.css";
import Data from "./data";
import React from "react";
import { useContext, useState, lazy, Suspense } from "react";
import { useHistory } from "react-router";
import { Link, Route, Switch } from "react-router-dom";
// import Detail from "./Detail";
import axios from "axios";
import Cart from "./Cart";
let Detail = lazy(() => {
	return import("./Detail.js");
}); //Detail이 필요한 순간에 import 해준다

export let 재고context = React.createContext(""); //1.범위 생성

function App() {
	let [shoes, setShose] = useState(Data);
	let [loading, setLoading] = useState(true);
	let [stock, setStock] = useState([10, 11, 12]);

	console.log(shoes);
	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/detail">
								Detail
							</Nav.Link>
							<Nav.Link as={Link} to="/cart">
								Cart
							</Nav.Link>

							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Switch>
				<Route exact path="/">
					<Card style={{ width: "18rem" }} className="bg">
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</Card.Text>
							<Button variant="primary">Go somewhere</Button>
						</Card.Body>
					</Card>
					<div className="container">
						<재고context.Provider value={stock}>
							<div className="row">
								{shoes.map((a, i) => {
									return <Carde shoes={shoes[i]} i={i} key={a.id} />;
									// return <Carde shoes={a} i={i} key={a.id} />;
								})}
							</div>
						</재고context.Provider>

						<button
							className="btn btn-primary"
							onClick={() => {
								setLoading(true);
								axios
									.get("https://codingapple1.github.io/shop/data2.json")
									.then((result) => {
										setLoading(false);
										console.log(result.data);
										setShose([...shoes, ...result.data]);
									})
									.catch(() => {
										console.log("failed");
									});
							}}
						>
							{/* {loading?} */}
							더보기
						</button>
					</div>
				</Route>
				<Route path="/detail">
					<재고context.Provider value={stock}>
						<Suspense fallback={<div>로딩중이에요</div>}>
							<Detail stock={stock} setStock={setStock} />
						</Suspense>
					</재고context.Provider>
				</Route>

				<Route path="/cart">
					<Cart></Cart>
				</Route>
				<Route path="/:id">
					<div>아무거나 적엇을떄 이거 보여주셈</div>
				</Route>
			</Switch>
			{/* <Route path="/dd" componenet={Modal}></Route> */}
		</div>
	);
}

function Carde(props) {
	let 재고 = useContext(재고context);
	let history = useHistory();
	return (
		<div
			className="col-md-4"
			onClick={() => {
				// history.push("detail/" + prop.s);
				history.push(`/detail/${props.shoes.id}`);
			}}
		>
			<img
				src={
					"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
				}
			/>
			<h4>{props.shoes.title}</h4>
			<p>
				{props.shoes.content} & {props.shoes.price}
			</p>
			{/* {재고[props.i]} */}
			<Test></Test>
		</div>
	);
}

function Test() {
	let 재고 = useContext(재고context);
	return <p>재고 : {재고[0]}</p>;
}

export default App;
