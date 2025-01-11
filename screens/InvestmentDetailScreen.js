import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { fetchInvestmentDetails, deleteInvestment } from '../repository/GoldInvestmentRepository';
import InvestmentDetailList from '../components/InvestmentDetailList';
import Pagination from '../components/Pagination';
import styles from '../styles/CssStyles';

const ITEMS_PER_PAGE = 10; // Jumlah item per halaman

const InvestmentDetailScreen = ({ navigation }) => {
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [orderByDate, setOrderByDate] = useState('DESC'); // Jumlah item per halaman

  useEffect(() => {
    fetchData();
  }, [orderByDate]);

  const fetchData = async () => {
    const data = await fetchInvestmentDetails(orderByDate);
    setInvestmentHistory(data);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    await deleteInvestment(id);
    fetchData();
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
        handleDelete={handleDelete}
        startIndex={startIndex}
        orderByDate={orderByDate}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </View>
  );
};

export default InvestmentDetailScreen;
