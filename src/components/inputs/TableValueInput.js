import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
	const [value, setValue] = React.useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 80 }} size="small">
			<InputLabel id="select-small-label">Значение</InputLabel>
			<Select
			labelId="select-small-label"
			defaultValue={0.05}
			label="Значение"
			onChange={handleChange}
			>
				<MenuItem value={0.01}>0.01</MenuItem>
				<MenuItem value={0.05}>0.05</MenuItem>
			</Select>
		</FormControl>
	);
}