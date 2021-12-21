import React from "react";

let 초기값 = [
	{ id: 0, name: "멋진신발", quan: 2 },
	{ id: 1, name: "nike", quan: 5 },
];

function Detailreducer(state = 초기값, 액션) {
	//data 수정조건
	if (액션.type === "수량증가") {
		let copy = [...state]; //기존 값 deep copy
		copy[0].quan++; //값 수정
		return copy; // 수정된값 리턴
	} else if (액션.type === "수량하락") {
		let copy = [...state];
		copy[0].quan--;
		if (copy[0].quan < 0) {
			copy[0].quan = 0;
			console.log("2");
		}
		return copy;
	} else {
		return state;
	}
}

export default Detailreducer;
