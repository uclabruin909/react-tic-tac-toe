import React from 'react';
import Utils from '../Utils';
import './Box.css';

const Box = (props) => {
	let {
		boxValue,
		boxIndex,
		onClickHandler
	} = props;

	let valueClassName = Utils.GetValueClassName(boxValue); 

	return (
    <div className="box" box-index={boxIndex} onClick={onClickHandler}>
      <span className={valueClassName}>{boxValue}</span>
    </div>
	);

};

export default Box;