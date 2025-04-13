import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd", // Soft off-white
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  goldRate: {
    fontSize: 16,
    marginBottom: 24,
    color: "#666",
    textAlign: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFB200", // Gold tone
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  spacing: {
    marginVertical: 12,
  },

  // Detail Screen
  containerDetail: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fefefe",
  },
  headerDetail: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  column: {
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  footerText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  // Pagination
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fafafa",
    borderRadius: 10,
  },
  paginationButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Add Investment Screen
  containerAddInvestment: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: "#fdfdfd",
  },

  // Graph Screen
  containerGraph: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#444",
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 10,
    alignSelf: "center",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 5,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },

  // About / Price Screen
  containerAbout: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerAbout: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  currency: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#222",
  },
  rateText: {
    fontSize: 16,
    color: "#555",
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

  // About Screen
  devHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  devName: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: "#007bff",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
});

export default styles;