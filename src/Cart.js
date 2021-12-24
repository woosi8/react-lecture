import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

const Cart = (props) => {
	// 리덕스에 있는 state를 갖다가 쓸때
	let state = useSelector((state) => state); //redux에 있는 모든 state
	console.log(state.reducer);
	// dispatch
	let dispatch = useDispatch();

	function 버튼누르면() {}

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경</th>
					</tr>
				</thead>
				<tbody>
					{state.reducer.map((states) => (
						<tr key={states.id}>
							<td>{states.id}</td>
							<td>{states.name}</td>
							<td>{states.quan}</td>
							<td>
								<button
									onClick={() => {
										dispatch({
											// 요 부분이 action 액션이 된다
											type: "수량증가",
											데이터: states.id,
										});
									}}
								>
									+
								</button>
								<button
									onClick={() => {
										dispatch({ type: "수량하락", 데이터: states.id });
									}}
								>
									-
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{state.reducer2 === true ? (
				<div className="my-alert2">
					<p>지금 구매하시면 신규항리 20%</p>
					<button
						onClick={() => {
							// 저장된 데이터 수정 방법 쓰기
							dispatch({ type: "alert닫기" });
						}}
					>
						닫기
					</button>
				</div>
			) : null}
			<Parent 이름="존박" 나이="20" />
		</div>
	);
};

// Usememo 불필요한 재랜더링 막기 기능 (단점 : 방식이 기존 props vs 바뀐 props 비교연산 후 컴포넌트 업데이트 여부를 결정하기 떄문에 props가 많아지면 사이트 속도 저하이유가됨)
//컴포넌트에 있는 props나 state가 변경되면 안에 있는 코드 전부 재랜더링
// ex) 위에서 Parent 이름="존박1"
function Parent(props) {
	return (
		<div>
			<Child1 이름={props.이름}></Child1>
			<Child2 나이={props.나이}></Child2>
		</div>
	);
}
function Child1(props) {
	useEffect(() => {
		console.log("랜더링됨1");
	});
	return <div>1111</div>;
}
//memo : props.나이가 변경이 될때만 재렌더링된다
let Child2 = memo(function () {
	useEffect(() => {
		console.log("랜더링됨2");
	});
	return <div>222</div>;
});

// ------------------------------------------------
// //redux store 데이터를 가져와서 props로 변환해주는 함수
// function state를props화(state) {
// 	console.log(state);
// 	return {
// 		// 상품명: state[0].name,
// 		state: state.reducer, //store에 있던 모든 데이터 []
// 		alert열렸니: state.reducer2,
// 	};
// }
// export default connect(state를props화)(Cart);
export default Cart;
