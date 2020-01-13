import React from 'react'
import Input from './Input'
import logo from '../images/logo.png'
import { TiTick } from 'react-icons/ti'
import { FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa'

function indicatorIcon(radius) {
	if (radius > 70) {
		return (
			<TiTick
				style={{ color: 'green', marginBottom: '-3px', fontSize: '1.1rem' }}
			/>
		)
	} else if (radius > 30) {
		return (
			<FaExclamationTriangle
				style={{
					color: 'rgb(255, 238, 0)',
					marginBottom: '-3px',
					fontSize: '1.1rem'
				}}
			/>
		)
	} else {
		return (
			<FaExclamationCircle
				style={{ color: 'red', marginBottom: '-3px', fontSize: '1.1rem' }}
			/>
		)
	}
}

const Sidebar = props => (
	<div className='sidebar'>
		<img className='logo' alt='logo, water detector' src={logo} />
		<Input getCoords={props.getCoords} />

		{props.haveUserLocation ? (
			<div className='dissolve'>
				<h3>
					<em>
						<u>Pinned Location</u>:{' '}
					</em>
					{props.placeName}
				</h3>
				<hr />
				<button className='show-land' onClick={props.getNearBy}>
					Land for water Near By
				</button>
			</div>
		) : (
			''
		)}
		{props.areaSelected ? (
			props.activeArea.name !== undefined ? (
				<div className='dissolve'>
					<hr />
					<h4>
						{' '}
						{props.activeArea.name} ({props.activeArea.placeType})
					</h4>
					<h4>
						Ground Water Finding Probablity:{' '}
						{Math.abs(props.activeArea.radius - Math.random() * 10).toFixed(2)}
						{'% '}
					</h4>
					<h4>
						Ground Water Quantity:{' '}
						{Math.abs(props.activeArea.radius - Math.random() * 10).toFixed(2)}
						{'% '}
					</h4>
					<h4>
						Ground Water Quality: {indicatorIcon(props.activeArea.radius)}
					</h4>
					<h4>Soil type: {props.activeArea.soilType}</h4>
					<hr />
					<ul style={{ listStyle: 'none', marginLeft: '-35px' }}>
						<li>{indicatorIcon(90)} - Good condition</li>
						<li>{indicatorIcon(40)} - Poor condition</li>
						<li>{indicatorIcon(10)} - Very bad condition</li>
					</ul>
				</div>
			) : (
				<div className='dissolve'>
					<hr />
					<h4>
						A place {props.activeArea.distance}m away from the pinned location.{' '}
						({props.activeArea.placeType})
					</h4>
					<h4>
						Ground Water Finding Probablity:{' '}
						{Math.abs(props.activeArea.radius - Math.random() * 10).toFixed(2)}
						{'% '}
					</h4>
					<h4>
						Ground Water Quantity:{' '}
						{Math.abs(props.activeArea.radius - Math.random() * 10).toFixed(2)}
						{'% '}
					</h4>
					<h4>
						Ground Water Quality: {indicatorIcon(props.activeArea.radius)}
					</h4>
					<hr />
					<ul style={{ listStyle: 'none', marginLeft: '-35px' }}>
						<li>{indicatorIcon(90)} - Good condition</li>
						<li>{indicatorIcon(40)} - Poor condition</li>
						<li>{indicatorIcon(10)} - Very bad condition</li>
					</ul>
				</div>
			)
		) : (
			''
		)}
	</div>
)

export default Sidebar
