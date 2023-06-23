import React, { useState } from 'react';
import CSVUploader from '../CSVUploader/CSVUploader';
import InputTable from '../tables/InputTable';
import IntermediateTable1 from '../tables/IntermediateTable1';
import RankTable from '../tables/RankTable';
import IntermediateTable2 from '../tables/IntermediateTable2';
import Report from '../report/Report';

const Main = () => {
	const [dataArr, setDataArr] = useState(null);

	const handleDataArr = (arr) => {
		const filteredDataArr = arr.filter((point) => {
			const x = parseInt(point.X);
			const y = parseInt(point.Y);
			return !isNaN(x) && !isNaN(y);
		});
		setDataArr(filteredDataArr);
	};

	return (
		<main className="col-md-10">
			<div className="row justify-content-center">
				<div className="col-md-auto">
					<h4>Загрузка данных</h4>
					<CSVUploader onDataArr={handleDataArr} />
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-md-10">
					<h4>Таблица входных данных</h4>
					<InputTable dataArr={dataArr} />
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-md-10">
					<h4>Таблица промежуточных вычислений 1</h4>
					<IntermediateTable1 dataArr={dataArr} />
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-md-10">
					<h4>Таблица рангов</h4>
					<RankTable dataArr={dataArr} />
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-md-10">
					<h4>Таблица промежуточных вычислений 2</h4>
					<IntermediateTable2 dataArr={dataArr} />
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-md-8">
					<Report dataArr={dataArr} />
				</div>
			</div>
		</main>
	);
};

export default Main;