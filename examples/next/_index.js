import React, { Component } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View, ScrollView, Text, TextInput } from 'react-native';
import { Provider, connect } from 'react-redux';
import { enterAnimation, ruuiActions, RuuiProvider, TouchableRipple, Button, Input, Modal, Snackbar, Dropdown, Tooltip, TooltipContainer, DropdownContainer, Select } from '../../src';

import appStore, { ruuiStore } from './store';
import ContextMenu from '../legacy/modal/contextMenu';
import TestModal from './components/modal';
import * as appActions from './store/action/app';

type ContainerProps = {
	store?: any,
};

function AppContainer(props: ContainerProps) {
	return <RuuiProvider store={ruuiStore} configs={configs}>
		<Provider store={appStore}>
			<App/>
		</Provider>
	</RuuiProvider>;
}

export default AppContainer;

type Props = {
	counter?: String | Number,
	dispatch?: Function,
}

@connect(({ app }) => {
	return {
		counter: app.counter,
	};
})
@enterAnimation()

class App extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			activeSelect: selects[0],
			account: '',
		};
	}

	render() {
		const opacity = this.enterAnimation.interpolate({
				inputRange: [0, 1], outputRange: [0.5, 1],
			}),
			animatedStyle = { opacity, minHeight: 1000, };

		return <Animated.View style={[styles.container, animatedStyle]}>
			<Select
				options={selects}
				value={this.state.activeSelect}
				onSelect={next => this.setState({ activeSelect: next })}/>

			<TouchableOpacity
				style={{ marginTop: 10, padding: 12, backgroundColor: '#888888', borderRadius: 3 }}
				onPress={() => {
					// this.props.dispatch(appActions.increaseCounter());
					this.props.dispatch(ruuiActions.insertSnackBar({ message: 'Snackbar content..', }));
					this.props.dispatch(ruuiActions.toggleLoading(true));
					setTimeout(() => {
						this.props.dispatch(ruuiActions.toggleLoading(false));
					}, 2000);
				}}>
				<Text>Add Snackbar {this.props.counter}</Text>
			</TouchableOpacity>

			<DropdownContainer
				dropdownWrapperStyle={{ width: 200, borderRadius: 5, }}
				dropdownComponent={ContextMenu}
				dropdownDirection="right"
				dropdownContext={{ name: 'Cloud' }}>
				<Text>Drop {this.state.account} {this.state.animationFinished ? 'TRUE' : 'FALSE'}</Text>
			</DropdownContainer>
			<Button
				wrapperStyle={{ marginBottom: 10 }}
				title="hey!!"
				tooltip="hey, this is a tooltip"
				tooltipDirection="top"
				tooltipInnerStyle={{ backgroundColor: 'red' }}
				onPress={() => {
					this.props.dispatch(ruuiActions.toggleModal(true, {
						component: TestModal,
						tapToClose: true,
						zIndex: 10,
					}));
					// this.secondInput.focus();
				}}/>
			{/*<Button title="top" tooltipDirection="top" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="left" tooltipDirection="left" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="bottom" tooltipDirection="bottom" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="right" tooltipDirection="right" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="top-left" tooltipDirection="top-left" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="left-top" tooltipDirection="left-top" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="bottom-left" tooltipDirection="bottom-left" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="left-bottom" tooltipDirection="left-bottom" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="bottom-right" tooltipDirection="bottom-right" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="right-bottom" tooltipDirection="right-bottom" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="top-right" tooltipDirection="top-right" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			{/*<Button title="right-top" tooltipDirection="right-top" wrapperStyle={{ marginTop: 10 }} tooltip="Yoohoo a skdjkalsjdlasdjla"/>*/}
			<TooltipContainer
				tooltip="hello world"
				style={{ backgroundColor: 'red', borderRadius: 3, paddingVertical: 18, }}>
				<Input
					floatingLabel="hey"
					value={this.state.account}
					onChangeText={account => this.setState({ account })}/>
				<Input
					ref={(instance) => { this.secondInput = instance; }}
					floatingLabel="heoo"
					value={this.state.account}
					onChangeText={account => this.setState({ account })}/>
			</TooltipContainer>
			<TooltipContainer tooltip="hello">
				<Text>Hello</Text>
			</TooltipContainer>
			<TouchableRipple style={styles.touchableRipple}>
				<Text style={{ color: '#ffffff', }}>Touchable Ripple</Text>
			</TouchableRipple>

			<Snackbar/>
			<Modal/>
			<Dropdown/>
			<Tooltip/>
		</Animated.View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
		backgroundColor: '#888888',
	},
	buttonWrapper: {
		backgroundColor: 'red',
		borderRadius: 4,
	},
	touchableRipple: {
		backgroundColor: 'rgb(0, 122, 255)',
		padding: 12,
		borderRadius: 3,
	},
});

const configs = {
	// button: {
	// 	styles: {
	// 		wrapper: {
	// 			backgroundColor: 'red',
	// 			borderRadius: 4,
	// 		}
	// 	}
	// },
	// modal: {
	// 	maskProps: () => ({
	// 		style: {
	// 			position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
	// 		},
	// 	}),
	// },
};

function fillArray(len) {
	const res = [];
	for (let i = 0; i < len; i += 1) res.push(i + 1);
	return res;
}

const selects = [{
	title: 'Selection 1',
}, {
	title: 'Selection 2',
}, {
	title: 'Selection 3',
}, {
	title: 'Selection 4',
}];
