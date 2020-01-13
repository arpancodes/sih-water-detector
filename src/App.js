import React, { Component } from 'react'
import Map from './components/MapLayout'
import './App.css'
import Sidebar from './components/Sidebar'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lat: 0,
			lng: 0,
			zoom: 1,
			radius: 0,
			waterBound: [],
			activeArea: {},
			areaSelected: false
		}
	}

	getCoords = () => {
		const address = document.querySelector('#placeInput').value
		this.setState({ activeArea: {}, areaSelected: false, waterBound: [] })
		fetch(
			`https://eu1.locationiq.com/v1/search.php?key=90df51d5d792e1&q=${address}&format=json`
		)
			.then(res => res.json())
			.then(json => {
				console.log(json)
				if (json.error) {
					throw new Error("Couldn't do that")
				}
				this.setState(currentState => {
					return {
						...currentState,
						lat: json[0].lat,
						lng: json[0].lon,
						zoom: 15,
						haveUserLocation: true,
						placeName: json[0].display_name,
						radius: 1000
					}
				})
			})
			.catch(error => {
				console.error(error)
			})
	}

	getNearBy = () => {
		const places = ['pub', 'fuel', 'restaurant', 'toilet', 'park']
		const soil = ['Clay', 'Sandy', 'Silty', 'Peaty', 'Chalky', 'Loamy']
		// const soil = ['Clay', 'Sandy', 'Silty', 'Peaty', 'Chalky', 'Loamy']
		places.forEach(placeToFetch => {
			fetch(
				`https://eu1.locationiq.com/v1/nearby.php?key=90df51d5d792e1&lat=${this.state.lat}&lon=${this.state.lng}&tag=${placeToFetch}&radius=${this.state.radius}&format=json`
			)
				.then(res => res.json())
				.then(bound => {
					if (bound.error) {
						throw new Error("Couldn't do that")
					}
					console.log(soil)
					this.setState(prevState => {
						return {
							...prevState,
							waterBound: [
								...prevState.waterBound,
								...bound.map(place => {
									let randomIndex = Math.floor(Math.random() * 6)
									console.log(randomIndex)
									return {
										center: [place.lat, place.lon],
										distance: place.distance,
										name: place.name,
										radius: Math.floor(Math.random() * 101),
										soilType: soil[randomIndex],
										placeType: placeToFetch
									}
								})
							]
						}
					})
				})
				.catch(error => {
					console.error(error)
				})
		})
	}

	selectArea = area => {
		this.setState({ activeArea: {}, areaSelected: false })
		this.setState({ activeArea: area, areaSelected: true })
		console.log(area)
	}

	render() {
		return (
			<div id='main-container'>
				<Sidebar
					getCoords={this.getCoords}
					placeName={this.state.placeName}
					haveUserLocation={this.state.haveUserLocation}
					getNearBy={this.getNearBy}
					areaSelected={this.state.areaSelected}
					activeArea={this.state.activeArea}
				/>

				<Map
					lat={this.state.lat}
					zoom={this.state.zoom}
					haveUserLocation={this.state.haveUserLocation}
					lng={this.state.lng}
					radius={this.state.radius}
					name={this.state.placeName}
					waterBound={this.state.waterBound}
					selectArea={this.selectArea}
				/>
			</div>
		)
	}
}

export default App
