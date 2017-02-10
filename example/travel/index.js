import React, { Component } from 'react';
import { AsyncStorage, StatusBar, View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { connect } from 'react-redux';
import { NavigationExperimental, utils } from '../../src';
import Drawer from 'react-native-drawer';
import Menu from './share/Menu';
import NavigationHeader from './share/NavigationHeader';
import * as appActions from './store/action/app';

const { isIos, isAndroid } = utils;

@connect(({router, app}) => {
	return {
		router,
		counter: app.counter,
	}
})

export class App extends Component {
	async componentWillMount () {
		if (isIos) {
			StatusBar.setBarStyle('light-content', true);
		} else if (isAndroid) {
			StatusBar.setBackgroundColor('transparent');
			StatusBar.setTranslucent(true);
		}

		let token = await AsyncStorage.getItem('sysConfig');
	}

	render () {
		const navigationState = this.props.router;

		return <Drawer
			type="overlay"
			side="right"
			negotiatePan={true}
			panOpenMask={0.2}
			tapToClose={true}
			openDrawerOffset={0.2}
			content={<Menu/>}
			tweenHandler={drawerTween}>

			<NavigationExperimental.CardStack
				style={styles.navigator}
				navigationState={navigationState}
				renderScene={this::renderScene}
				renderHeader={this::renderHeader}
				gestureResponseDistance={50}
				onNavigateBack={() => console.log('Back..')}/>
		</Drawer>
	}
}

function renderScene (props) {
	const Scene = props.scene.route.component;
	return <Scene/>
}

function renderHeader (sceneProps) {
	if (!sceneProps.scene.route.hideNavigation) {
		return <NavigationHeader {...sceneProps}/>
	}
}

function drawerTween (ratio, side = 'left') {
	return {
		main: { opacity:(2-ratio)/1.2 },
		drawer: {
			shadowColor: '#000000',
			shadowOpacity: 0.1 + (ratio * 0.3),
			shadowRadius: ratio * 60,
			elevation: ratio * 50,
		}
	}
}

const styles = StyleSheet.create({
	drawer: {
		backgroundColor: '#000',
	},
	navigator: {
		flex: 1,
		backgroundColor: 'red',
	}
});

export default function AppContainer ({store}) {
	return <Provider store={store}>
		<App/>
	</Provider>
}