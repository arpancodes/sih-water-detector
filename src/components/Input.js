import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Input = props => (
	<div className='search-input'>
		<input placeholder='Search for a place' id='placeInput' />
		<button onClick={props.getCoords}>
			<FaSearch />
		</button>
	</div>
)

export default Input
