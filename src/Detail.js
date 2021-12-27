import React, { useContext, useEffect, useState } from "react";
// import {  } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App.js";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./Detail.scss";
import { connect } from "react-redux";

let 제목 = styled.h4`
	font-size: 55px;
	color: ${(props) => props.색상};
`;
const Detail = (props) => {
	let { id } = useParams();
	const [alerts, setAlerts] = useState("재고가 얼마 남지 않았다");
	const [alerts2, setAlerts2] = useState(true);
	const [inputData, setInputData] = useState("");
	const [누른탭, 누른탭변경] = useState(0);
	const [스위치, 스위치변경] = useState(false);
	console.log(id);

	useEffect(() => {
		var arr = localStorage.getItem("watched");
		if (arr == null) {
			arr = [];
		} else {
			1;
			arr = JSON.parse(arr);
		}
		// arr.push(id);
		arr = new Set(arr); //중복 제거
		arr = [...arr];
		localStorage.setItem("watched", JSON.stringify(arr));
	}, []);

	function onClick(params) {}
	let 재고 = useContext(재고context);

	useEffect(() => {
		// console.log(1111);
		let timer = setTimeout(() => {
			setAlerts("");
			setAlerts2(false);
		}, 2000);

		return () => {
			clearTimeout(timer); // 버그 방지 (Detail 컴포넌트가 사라질때 실행하는 코드 return)
		};
	}, [alerts]);
	let history = useHistory();
	return (
		<div>
			<div className="container">
				{/* <제목 className="red" 색상="dodgerblue"> */}
				<제목 className="red">title</제목>
				<div className="my-alert">
					<p>{alerts}</p>
				</div>
				<input
					onChange={(e) => {
						setInputData(e.target.value);
					}}
				/>
				{inputData}
				{alerts2 === true ? (
					<div className="my-alert-blue">
						<p>재고가 얼마 없어요</p>
					</div>
				) : null}
				<div className="row">
					<div className="col-md-6">
						<img
							src="https://codingapple1.github.io/shop/shoes1.jpg"
							width="100%"
						/>
					</div>
					<div className="col-md-6 mt-4">
						<h4 className="pt-5">상품명</h4>
						<p>상품설명</p>
						<p>120000원</p>
						{재고}
						<Info store={props.stock} />

						<button
							className="btn btn-danger"
							onClick={(e) => {
								props.setStock([props.stock[0] - 1]);
								// 이게 전부 액션이다
								props.dispatch({
									type: "항목추가",
									payload: { id: 2, name: "새로운상품", quan: 1 }, //redux stor에 데이터 보냄
								});
								history.push("/cart"); //페이지 이동시 강제새로고침 방지
							}}
						>
							주문하기
						</button>
						<button
							className="btn btn-danger"
							onClick={() => {
								history.goBack();
								// history.push('/');
							}}
						>
							뒤로가기
						</button>
					</div>
				</div>
			</div>
			<Nav
				style={{ marginTop: "30px" }}
				variant="tabs"
				defaultActiveKey="link-0"
			>
				<Nav.Item>
					<Nav.Link
						eventKey="link-0"
						onClick={() => {
							누른탭변경(0);
						}}
					>
						Active
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="link-1"
						onClick={() => {
							누른탭변경(1);
							스위치변경(false);
						}}
					>
						Option 2
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="link-2"
						onClick={() => {
							누른탭변경(2);
							스위치변경(false); //클릭시 모든 엘리먼트가 false 초기값이 되도록, 탭변경 엘리먼트 뺴고
						}}
					>
						Option 2
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<CSSTransition in={스위치} classNames="wow" timeout={500}>
				<TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
			</CSSTransition>
		</div>
	);
};

function TabContent(props) {
	useEffect(() => {
		props.스위치변경(true);
	});

	if (props.누른탭 === 0) {
		return <div>0000</div>;
	} else if (props.누른탭 === 1) {
		return <div>1111</div>;
	} else if (props.누른탭 === 2) {
		return <div>2222</div>;
	}
}

function Info(props) {
	console.log(props.store);
	return <p>재고 : {props.store[0]}</p>;
}

function state를props화(state) {
	console.log(state);
	return {
		// 상품명: state[0].name,
		state: state.reducer, //store에 있던 모든 데이터 []
		alert열렸니: state.reducer2,
	};
}

// 번외 - 함수안엔 함수 실행

function first(params) {
	console.log(1);
	params(); //second 함수 실행
}
function second() {
	console.log(2);
}

first(second); //first실행하라 파라미터로 second넣어서

export default connect(state를props화)(Detail);
