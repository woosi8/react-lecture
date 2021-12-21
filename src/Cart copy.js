import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

const Cart = (props) => {
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
					{props.state.map((states) => (
						<tr key={states.id}>
							<td>{states.id}</td>
							<td>{states.name}</td>
							<td>{states.quan}</td>
							<td>
								<button
									onClick={() => {
										props.dispatch({
											// 요 부분이 action 액션이 된다
											type: "수량증가",
										});
									}}
								>
									+
								</button>
								<button
									onClick={() => {
										props.dispatch({ type: "수량하락" });
									}}
								>
									-
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{props.alert열렸니 === true ? (
				<div className="my-alert2">
					<p>지금 구매하시면 신규항리 20%</p>
					<button
						onClick={() => {
							// 저장된 데이터 수정 방법 쓰기
							props.dispatch({ type: "alert닫기" });
						}}
					>
						닫기
					</button>
				</div>
			) : null}
		</div>
	);
};

//redux store 데이터를 가져와서 props로 변환해주는 함수
function state를props화(state) {
	console.log(state);
	return {
		// 상품명: state[0].name,
		state: state.reducer, //store에 있던 모든 데이터 []
		alert열렸니: state.reducer2,
	};
}
export default connect(state를props화)(Cart);
// export default Cart;
