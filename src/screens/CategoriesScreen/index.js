import React, { Component } from "react";
import {
	View,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
	Alert
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import {
	HR,
	ColorPicker,
	ColorView,
	Text,
	TextInput
} from "ReactNativeNotas/src/components";
import CategoryItem from "./CategoryItem";
import DrawerHeaderButton from "ReactNativeNotas/src/navigation/DrawerHeaderButton";
import withColors from "ReactNativeNotas/src/styles/withColors";
import {
	addCategory,
	updateCategory,
	removeCategory
} from "ReactNativeNotas/src/redux/reducers/categoriesReducer";

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start"
	},
	row: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	list: {
		width: "100%"
	},
	addInput: {
		flex: 1
	}
});

class CategoriesScreen extends Component {
	constructor(props) {
		super(props);

		this.defaultNewCat = {
			category: null,
			color: props.colors.categoryColors[0]
		};

		this.state = {
			modalVisible: false,
			itemSelected: null,
			newCategory: this.defaultNewCat
		};
	}

	openChangeColor = item => {
		this.setState({
			modalVisible: true,
			itemSelected: item
		});
	};

	handleChangeColor = color => {
		this.setState({ modalVisible: false, itemSelected: null });

		const { itemSelected } = this.state;
		if (itemSelected) {
			// Actualizar seleccionada
			this.props.updateCategory({
				...itemSelected,
				color
			});
			this.setState({ modalVisible: false, itemSelected: null });
		} else {
			// Añadir nueva
			this.setState({
				modalVisible: false,
				newCategory: { ...this.state.newCategory, color }
			});
		}
	};

	updateNewCategory = category => {
		this.setState({ newCategory: { ...this.state.newCategory, category } });
	};

	addCategory = () => {
		this.props.addCategory(this.state.newCategory);
		this.setState({ newCategory: this.defaultNewCat });
	};

	updateCategoryName = (category, name) => {
		this.props.updateCategory({
			...category,
			category: name
		});
	};

	removeCategory = category => {
		Alert.alert(
			"Borrar categoría",
			`Quieres borrar '${category.category}' de la lista y de todas las notas?`,
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Borrar",
					style: "destructive",
					onPress: () => this.props.removeCategory(category.id)
				}
			]
		);
	};

	render() {
		const { modalVisible, itemSelected, newCategory } = this.state;
		const { categories, colors } = this.props;
		const basicStyles = getBasicStyles(colors);
		return (
			<View style={[basicStyles.container, styles.container]}>
				<View style={styles.row}>
					<TextInput
						style={styles.addInput}
						placeholder="Nueva categoría"
						value={newCategory.category}
						onChangeText={this.updateNewCategory}
					/>
					<TouchableOpacity onPress={() => this.openChangeColor(null)}>
						<ColorView color={newCategory.color} />
					</TouchableOpacity>
					<Button title="+" onPress={this.addCategory} />
				</View>
				<HR />
				<FlatList
					style={styles.list}
					data={categories}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<CategoryItem
							item={item}
							openChangeColor={this.openChangeColor}
							onChangeText={text => this.updateCategoryName(item, text)}
							onRemove={() => this.removeCategory(item)}
						/>
					)}
					ItemSeparatorComponent={() => <HR color="#aaa" size="100%" />}
				/>
				<ColorPicker
					visible={modalVisible}
					onChange={this.handleChangeColor}
					selectedColor={itemSelected ? itemSelected.color : newCategory.color}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			addCategory,
			updateCategory,
			removeCategory
		},
		dispatch
	);
};

const CategoriesHOC = connect(
	mapStateToProps,
	mapDispatchToProps
)(withColors(CategoriesScreen));

CategoriesHOC.navigationOptions = ({ navigation }) => ({
	title: "Categorias",
	headerLeft: <DrawerHeaderButton navigation={navigation} />
});

export default CategoriesHOC;
