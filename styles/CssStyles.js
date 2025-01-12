import {
	StyleSheet
} from "react-native";

const styles = StyleSheet.create({
    // Styles for HomeScreen
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		padding: 20,
	},
	goldRate: {
		fontSize: 16,
		marginBottom: 24,
		color: "#888",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	summary: {
		fontSize: 16,
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#007bff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		width: "80%",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	spacing: {
		marginVertical: 10,
	},

	// Styles for InvestmentDetailScreen
	containerDetail: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff'
	},
	headerDetail: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#f0f0f0'
	},
	headerText: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
	item: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#ccc'
	},
	column: {
		textAlign: 'center'
	},
	footer: {
		flexDirection: 'row',
		padding: 10,
		borderTopWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#f0f0f0'
	},
	footerText: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	pageInfo: {
		fontWeight: 'bold'
	},

	// Styles for AddInvestmentScreen
	containerAddInvestment: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
		backgroundColor: '#fff',
	},

	// Styles for GraphScreen
	containerGraph: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
	},
	picker: {
		height: 50,
		marginBottom: 16,
	},
	chart: {
		marginVertical: 10,
		alignSelf: 'center',
	},
	tooltip: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.7)',
		padding: 10,
		borderRadius: 5,
	},
	tooltipText: {
		color: '#fff',
		fontSize: 14,
	},
	noData: {
		textAlign: 'center',
		fontSize: 16,
		color: '#888',
	},

	//Styles for GoldPriceScreen
	containerAbout: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	headerAbout: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 3,
	},
	currency: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	rateText: {
		fontSize: 16,
		color: "#333",
	},
	footerAbout: {
		marginTop: 20,
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
		alignItems: "center",
	},
	devHeader: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#007bff",
	},
	devName: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 10,
	},
	link: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 5,
		textDecorationLine: "underline",
	},
});

export default styles;