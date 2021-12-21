import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { HashRouter } from "react-router-dom"; // 서버와 통신하지 않고 라우팅을 한다
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
// import Detailreducer from "./Redux/Detail"

let 초기값 = [
	{ id: 0, name: "멋진신발", quan: 2 },
	{ id: 1, name: "nike", quan: 5 },
];

// state 데이터 관리 기능 : state 데이터 수정밥벙을 미리 정의해야 한다
//reducer는 그냥 수정된 state를 뱉는 함수
function reducer(state = 초기값, 액션) {
	//액션은 dispatch 할때의 데이터들을 담고있다
	// 데이터 수정 방법을 저장
	if (액션.type === "항목추가") {
		let found = state.findIndex((a) => {
			// a는 state의 항목 전부
			return a.id === 액션.payload.id;
		});
		if (found >= 0) {
			let copy = [...state];
			copy[found].quan++;
			return copy;
		} else {
			let copy = [...state];
			copy.push(액션.payload); //detail에서 데이터 가져옴
			return copy;
		}
	}
	//data 수정조건
	else if (액션.type === "수량증가") {
		let copy = [...state]; //기존 값 deep copy
		copy[액션.데이터].quan++; //값 수정
		return copy; // 수정된값 리턴
	} else if (액션.type === "수량하락") {
		let copy = [...state];
		copy[액션.데이터].quan--;
		if (copy[액션.데이터].quan < 0) {
			copy[액션.데이터].quan = 0;
		}
		return copy;
	} else {
		return state;
	}
}

let alert초기값 = true;

//이건 사실 Cart에서만 쓰여서 리덕스 할 필요는 없다
function reducer2(state = alert초기값, 액션) {
	// if () {
	// }
	if (액션.type === "alert닫기") {
		state = false;
		return state;
	} else {
		return state;
	}
}

// let store = createStore(reducer); //state 보관통
let store = createStore(combineReducers({ reducer, reducer2 })); //reducer 통합

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
