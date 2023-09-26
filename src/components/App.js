import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import Wrapper from './wrapper/Wrapper';
import { DataProvider } from './utils/DataContext';

function App() {
	return (
		<DataProvider>
			<Wrapper>
				<Sidebar/>
				<Main/>
			</Wrapper>
		</DataProvider>
	);
}

export default App;