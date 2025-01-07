import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

const ITEMS_PER_PAGE = 10; // Jumlah item per halaman

const InvestmentDetailScreen = ({ navigation }) => {
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [orderByDate, setOrderByDate] = useState('DESC'); // Default sorting by newest

  useEffect(() => {
    fetchInvestmentDetails();
  }, [orderByDate]);

  const fetchInvestmentDetails = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, input_date, weight_gram, investment_value
         FROM gold_investments
         WHERE use_data = 'Y'
         ORDER BY input_date ${orderByDate};`,
        [],
        (_, result) => {
          const rows = [];
          for (let i = 0; i < result.rows.length; i++) {
            rows.push(result.rows.item(i));
          }
          setInvestmentHistory(rows);
          setCurrentPage(1); // Reset ke halaman pertama saat data di-refresh
        },
        (error) => {
          console.error("Query Error:", error.message);
        }
      );
    });
  };

  const toggleOrder = () => {
    setOrderByDate((prevOrder) => (prevOrder === 'DESC' ? 'ASC' : 'DESC'));
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus data ini?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql(
                `UPDATE gold_investments SET use_data = 'N' WHERE id = ?;`,
                [id],
                () => {
                  fetchInvestmentDetails();
                  navigation.navigate('Home');
                },
                (error) => {
                  console.error("Gagal menghapus data:", error.message);
                }
              );
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Hitung data yang ditampilkan berdasarkan halaman
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = investmentHistory.slice(startIndex, endIndex);

  const totalPages = Math.ceil(investmentHistory.length / ITEMS_PER_PAGE);

  const renderFooter = () => {
    const totalWeight = investmentHistory.reduce((sum, item) => sum + (item.weight_gram || 0), 0);
    const totalInvestment = investmentHistory.reduce((sum, item) => sum + (item.investment_value || 0), 0);

    return (
      <View style={styles.footer}>
        <Text style={[styles.footerText, { flex: 2 }]}>Total</Text>
        <Text style={[styles.footerText, { flex: 3 }]}>{totalWeight.toFixed(2)} gram</Text>
        <Text style={[styles.footerText, { flex: 3 }]}>Rp {totalInvestment.toLocaleString('id-ID')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleOrder} style={styles.header}>
        <Text style={[styles.headerText, { flex: 1 }]}>No</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Tanggal</Text>
        <Text style={[styles.headerText, { flex: 3 }]}>Berat Emas (gr)</Text>
        <Text style={[styles.headerText, { flex: 3 }]}>Nilai Investasi (Rp)</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Aksi</Text>
      </TouchableOpacity>
      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const formattedDate = new Date(item.input_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return (
            <View style={styles.item}>
              <Text style={[styles.column, { flex: 1 }]}>{startIndex + index + 1}</Text>
              <Text style={[styles.column, { flex: 2 }]}>{formattedDate}</Text>
              <Text style={[styles.column, { flex: 3 }]}>{item.weight_gram.toFixed(2)}</Text>
              <Text style={[styles.column, { flex: 3 }]}>Rp {item.investment_value.toLocaleString("id-ID")}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.column, { flex: 1, alignItems: 'center' }]}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={renderFooter}
      />
      {/* Navigasi Halaman */}
      <View style={styles.pagination}>
        <Button
          title="Previous"
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
        <Text style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          title="Next"
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#f0f0f0' },
  headerText: { fontWeight: 'bold', textAlign: 'center' },
  item: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  column: { textAlign: 'center' },
  footer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#f0f0f0' },
  footerText: { fontWeight: 'bold', textAlign: 'center' },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  pageInfo: { fontWeight: 'bold' },
});

export default InvestmentDetailScreen;
