import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import Wrapper from './wrapper/Wrapper';

function App() {
	return (
		<Wrapper>
			<Sidebar/>
			<Main/>
		</Wrapper>
	);
}

export default App;