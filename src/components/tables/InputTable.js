import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

export default function InputTable({ dataArr }) {
	const columns = [
		{ field: 'id', headerName: '№', width: 250, editable: false },
		{ field: 'X', headerName: 'X', width: 250, editable: false },
		{ field: 'Y', headerName: 'Y', width: 250, editable: false },
	];

	return (
		<div style={{ height: 630, width: '100%' }}>
			<DataGrid
				editMode="row"
				rows={dataArr}
				columns={columns}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				pageSizeOptions={[10, 25, 50]}
			/>
		</div>
	);
}