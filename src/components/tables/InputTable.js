import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function InputTable({ dataArr }) {
	const columns = [
		{ field: 'id', headerName: '№', width: 250, editable: false },
		{ field: 'X', headerName: 'X', width: 250, editable: true },
		{ field: 'Y', headerName: 'Y', width: 250, editable: true },
	];

	const rows = dataArr;

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