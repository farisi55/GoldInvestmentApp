import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { fetchInvestmentDetails, deleteInvestment } from '../repository/GoldInvestmentRepository';
import InvestmentDetailList from '../components/InvestmentDetailList';
import Pagination from '../components/Pagination';
import styles from '../styles/CssStyles';

const ITEMS_PER_PAGE = 10; // Jumlah item per halaman

const InvestmentDetailScreen = ({ navigation }) => {
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [orderByDate, setOrderByDate] = useState('DESC'); // Urutkan berdasarkan tanggal

  useEffect(() => {
    fetchData();
  }, [orderByDate]);

  const fetchData = async () => {
    const data = await fetchInvestmentDetails(orderByDate);
    setInvestmentHistory(data);
    setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Ya',
          onPress: async () => {
            await handleDelete(id);
            navigation.navigate('Home'); // Navigasi ke halaman Home
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteInvestment(id);
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat menghapus data.');
    }
  };

  const toggleOrder = () => setOrderByDate((prev) => (prev === 'DESC' ? 'ASC' : 'DESC'));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = investmentHistory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(investmentHistory.length / ITEMS_PER_PAGE);

  return (
    <View style={styles.containerDetail}>
      <InvestmentDetailList
        data={currentData}
        toggleOrder={toggleOrder}
        handleDelete={confirmDelete}
        startIndex={startIndex}
        orderByDate={orderByDate}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        }
      />
    </View>
  );

};

export default InvestmentDetailScreen;
