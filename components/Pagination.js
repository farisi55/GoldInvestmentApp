import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/CssStyles';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <View style={styles.pagination}>
    <TouchableOpacity
      disabled={currentPage === 1}
      onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
    >
      <Text style={styles.paginationButtonText}>Previous</Text>
    </TouchableOpacity>

    <Text style={styles.pageInfo}>
      {`Page ${currentPage} of ${totalPages}`}
    </Text>

    <TouchableOpacity
      disabled={currentPage === totalPages}
      onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
    >
      <Text style={styles.paginationButtonText}>Next</Text>
    </TouchableOpacity>
  </View>
);

export default Pagination;