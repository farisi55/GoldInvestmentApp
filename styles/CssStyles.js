import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  containerDetail: { flex: 1, padding: 10, backgroundColor: '#fff' },
  headerDetail: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#f0f0f0' },
  headerText: { fontWeight: 'bold', textAlign: 'center' },
  item: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  column: { textAlign: 'center' },
  footer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#f0f0f0' },
  footerText: { fontWeight: 'bold', textAlign: 'center' },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  pageInfo: { fontWeight: 'bold' },
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
});

export default styles;
