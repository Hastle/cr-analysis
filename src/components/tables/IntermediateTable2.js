import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function IntermediateTable2({ dataArr }) {
	const columns = [
		{ field: 'id', headerName: '№', width: 250, editable: false },
		{ field: 'X', headerName: 'X', width: 250, editable: false },
		{ field: 'Y', headerName: 'Y', width: 250, editable: false },
	];

	if (dataArr === null || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}
	const rows = dataArr;
	console.log(rows);

	return (
		<div style={{ height: 630, width: '100%' }}>
			<DataGrid
			editMode="row"
			rows={rows}
			columns={columns}
			initialState={{
				pagination: { paginationModel: { pageSize: 10 } },
			}}
			pageSizeOptions={[10, 25, 50]}
			/>
		</div>
	);
}