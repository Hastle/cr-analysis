import React from 'react';

const Wrapper = (props) => {
	return (
		<div className="container-fluid">
			<div className="row">
				{props.children}
			</div>
		</div>
	);
}
export default Wrapper;