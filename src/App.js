import React from "react";
import { YMaps, Map } from "react-yandex-maps";

const mapState = {
  center: [55.76, 37.64],
  zoom: 10,
  controls: []
};

class App extends React.Component {

	constructor(props) {
		super(props);
		this.addressInput = React.createRef();
	}

	onYmapsLoad = ymaps => {
		this.ymaps = ymaps;
		var input = this.addressInput.current;
		var MySuggestLayout = ymaps.templateLayoutFactory.createClass([
			'{% if state.open %}',
			  '{% include "islands#suggestView" %}',
			'{% endif %}'    
		  ].join(''))
		input.addEventListener('keyup', () => {
			
			var suggestView = new this.ymaps.SuggestView(this.addressInput.current, {
				layout: MySuggestLayout,
				results: 6,
				offset: [-2, 3],
			});
			suggestView.state.set('open', false);
			if (input.value.length > 2) {
				suggestView.state.set({
					open: true,
					panelClosed: false
				});
			} else if (input.value.length < 3) {
				suggestView.state.set({
					open: false,
					panelClosed: true,
					items: []
				});
			}
		});
	};

	render() {
		return (
			<div>
				<input id="suggest" ref={this.addressInput} placeholder="адрес..." />
				<YMaps query={{ load: "package.full" }}>
					<Map
						state={mapState}
						onLoad={this.onYmapsLoad}
					/>
				</YMaps>
			</div>
		);
	}
}

export default App;