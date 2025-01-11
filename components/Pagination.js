import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/CssStyles';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
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
);

export default Pagination;
