import React from 'react';

import './Box.css';

const Box = (props) => {
	const {
		boxValue,
		className,
		boxIndex,
		onClickHandler
	} = props;

	return (
    <div className={className} box-index={boxIndex} onClick={onClickHandler}>
      {boxValue}
    </div>
	);

};

export default Box;