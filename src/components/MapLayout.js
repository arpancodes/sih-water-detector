import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { myIcon } from '../utility/icons'

class MapLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lat: this.props.lat,
			lng: this.props.lng,
			zoom: this.props.zoom,
			haveUserLocation: this.props.haveUserLocation
		}
	}

	render() {
		const position = [this.props.lat, this.props.lng]
		return (
			<Map className='map' center={position} zoom={this.props.zoom}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{this.props.haveUserLocation ? (
					<span>
						<Marker icon={myIcon} position={position}>
							<Popup>{this.props.name}</Popup>
						</Marker>

						<Circle center={position} radius={this.props.radius} color='red'>
							{this.props.waterBound.map(place => {
								return (
									<Circle
										center={place.center}
										onClick={() => {
											this.props.selectArea(place)
										}}
										radius={place.radius}
									/>
								)
							})}
						</Circle>
					</span>
				) : (
					''
				)}
			</Map>
		)
	}
}

export default MapLayout
