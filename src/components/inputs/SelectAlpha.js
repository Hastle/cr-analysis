import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAlpha({ selectedAlpha, onAlphaChange }) {

	const handleAlphaChange = (event) => {
		const alpha = event.target.value;
		onAlphaChange(alpha);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 80 }} size="small">
			<InputLabel id="demo-select-small-label">Значение</InputLabel>
			<Select
			labelId="demo-select-small-label"
			defaultValue={0.05}
			label="Значение"
			onChange={handleAlphaChange}
			>
				<MenuItem value={0.01}>0.01</MenuItem>
				<MenuItem value={0.05}>0.05</MenuItem>
				<MenuItem value={0.001}>0.001</MenuItem>
			</Select>
		</FormControl>
	);
}