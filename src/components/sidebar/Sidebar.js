import React from 'react';
import Logo from './logo/Logo'
import { useData } from '../utils/DataContext';
import dataExample1 from "../../data/DataExample1";
import dataExample2 from "../../data/DataExample2";
import './sidebar.sass';

const Sidebar = () => {
	const { setData } = useData();

	const handleExample1Click = () => {
		setData(dataExample1);
	};

	const handleExample2Click = () => {
		setData(dataExample2);
	};

	const handleDownloadReportClick = () => {
		alert('Вы кликнули на Скачать отчёт');
	}

	return (
		<div className="col-md-2 navigation">
			<Logo />
			<div className="links-layer">
				<button onClick={handleExample1Click}>Пример 1</button>
				<button onClick={handleExample2Click}>Пример 2</button>
			</div>
			<div className="links-layer mb-3">
				{/*<button onClick={handleDownloadReportClick}>Скачать отчёт</button>*/}
			</div>
		</div>
	);
}

export default Sidebar;