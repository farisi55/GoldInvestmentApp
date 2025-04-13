import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF5", // soft creamy gold
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  goldRate: {
    fontSize: 16,
    marginBottom: 24,
    color: "#8E793E", // soft gold brown
    textAlign: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#4A3F1D", // deep soft brown
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    marginBottom: 6,
    color: "#5C4F2D",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFFDF5", // Gold
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
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
    backgroundColor: "#FFFDF5",
  },
  headerDetail: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#EADCA8",
    backgroundColor: "#FFFDF5",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A3F1D",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#F2E9C4",
  },
  column: {
    textAlign: "center",
    color: "#4A3F1D",
  },
  footer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#EADCA8",
    backgroundColor: "#FFFDF5",
  },
  footerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A3F1D",
  },

  // Pagination
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFFDF5",
    borderRadius: 10,
  },
  paginationButton: {
    backgroundColor: "#FFFDF5",
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
    backgroundColor: "#E0E0E0",
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5C4F2D",
  },

  // Add Investment
  containerAddInvestment: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFDF5",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#4A3F1D",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D4C29A",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: "#FFFDF5",
    color: "#333",
  },

  // Graph Screen
  containerGraph: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFDF5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#4A3F1D",
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
    color: "#999",
  },

  // About / Harga Emas Screen
  containerAbout: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFDF5",
  },
  headerAbout: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A3F1D",
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
    shadowOpacity: 0.1,
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
    color: "#666",
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

  // Developer / Info App
  devHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A3F1D",
  },
  devName: {
    fontSize: 16,
    marginBottom: 10,
    color: "#4A3F1D",
  },
  link: {
    color: "#FFB200",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFDF5",
  },
  content: {
    padding: 20,
  },

  // Backup Restore Screen
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backupRestoreContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 24,
    marginBottom: 40,
  },
  backupRestoreButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backupRestoreIcon: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  backupRestoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#FFB200',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default styles;
