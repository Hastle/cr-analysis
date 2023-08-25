import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ChartTypeInput({ selectedType, onTypeChange }) {
    const handleChange = (event) => {
        const newType = event.target.value;
        onTypeChange(newType); // Вызов колбэка при изменении типа
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
            <InputLabel id="select-small-label">Функция</InputLabel>
            <Select
                labelId="select-small-label"
                defaultValue={'straight'}
                label="Функция"
                onChange={handleChange}
            >
                <MenuItem value={'straight'}>Прямая</MenuItem>
                <MenuItem value={'parabola'}>Парабола</MenuItem>
                <MenuItem value={'exponential'}>Показательная</MenuItem>
                <MenuItem value={'hyperbola'}>Гипербола</MenuItem>
                <MenuItem value={'logarithmic'}>Логарифмическая</MenuItem>
            </Select>
        </FormControl>
    );
}
