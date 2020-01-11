import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { waterIcon, myIcon } from '../utility/icons'
import { waterData } from '../utility/data'

class MapLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lat: 51.505,
			lng: -0.09,
			zoom: 1,
			haveUserLocation: false
		}
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState(currentState => {
					return {
						...currentState,
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						zoom: 17,
						haveUserLocation: true
					}
				})
			},
			() => {
				fetch('https://ipapi.co/json/')
					.then(res => res.json())
					.then(location => {
						this.setState(currentState => {
							return {
								...currentState,
								lat: location.latitude,
								lng: location.longitude,
								zoom: 17,
								haveUserLocation: true
							}
						})
					})
			}
		)
	}

	render() {
		const position = [this.state.lat, this.state.lng]
		return (
			<Map className='map' center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{this.state.haveUserLocation ? (
					<Marker icon={myIcon} position={position}>
						<Popup>This is your Location </Popup>
					</Marker>
				) : (
					''
				)}

				{waterData.map(data => {
					if (this.state.haveUserLocation) {
						return (
							<Marker
								key={data.latitude}
								icon={waterIcon}
								position={[data.latitude, data.longitude]}
							>
								<Popup>
									<p> Water Level : {data.popupMessage.waterlevel}</p>
									<p> Rock Possibility : {data.popupMessage.rockPossibility}</p>
									{/* <a href="">Read More</a> */}
								</Popup>
							</Marker>
						)
					} else return ''
				})}
			</Map>
		)
	}
}

export default MapLayout
