import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Button,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/CssStyles';
import BannerAdComponent from './BannerAdComponent';
import { useNavigation } from '@react-navigation/native';
import AdManager from '../utils/AdManager';

const InvestmentDetailList = ({ data, toggleOrder, handleDelete, startIndex, pagination = null }) => {
  const navigation = useNavigation();

  const renderFooter = () => {
    const totalWeight = data.reduce((sum, item) => sum + (item.weight_gram || 0), 0);
    const totalInvestment = data.reduce((sum, item) => sum + (item.investment_value || 0), 0);
    return (
      <View style={styles.footer}>
        <Text style={[styles.footerText, { flex: 2 }]}>Total</Text>
        <Text style={[styles.footerText, { flex: 3 }]}>{totalWeight.toFixed(2)} gram</Text>
        <Text style={[styles.footerText, { flex: 3 }]}>Rp {totalInvestment.toLocaleString('id-ID')}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>

        {/* Konten utama */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={toggleOrder} style={styles.headerDetail}>
            <Text style={[styles.headerText, { flex: 1 }]}>No</Text>
            <Text style={[styles.headerText, { flex: 2 }]}>Tanggal</Text>
            <Text style={[styles.headerText, { flex: 3 }]}>Berat Emas (gr)</Text>
            <Text style={[styles.headerText, { flex: 3 }]}>Nilai Investasi (Rp)</Text>
            <Text style={[styles.headerText, { flex: 1 }]}>Aksi</Text>
          </TouchableOpacity>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              const formattedDate = new Date(item.input_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });

              return (
                <View style={styles.item}>
                  <Text style={[styles.column, { flex: 1 }]}>{startIndex + index + 1}</Text>
                  <Text style={[styles.column, { flex: 2 }]}>{formattedDate}</Text>
                  <Text style={[styles.column, { flex: 3 }]}>{item.weight_gram.toFixed(2)}</Text>
                  <Text style={[styles.column, { flex: 3 }]}>Rp {item.investment_value.toLocaleString('id-ID')}</Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={[styles.column, { flex: 1, alignItems: 'center' }]}
                  >
                    <Image
                     source={require('../assets/icons/trash.png')}
                     style={{ width: 24, height: 24}}
                     resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            ListFooterComponent={() => (
              <>
                {renderFooter()}
                {React.isValidElement(pagination) && pagination}
              </>
            )}
            contentContainerStyle={{ paddingBottom: 120 }} // agar konten tidak tertutup banner
          />
        </View>

        {/* Tombol kembali */}
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <Button
            title="Back to Home"
            onPress={() => {
              AdManager.showAd();
              navigation.navigate('Home');
            }}
          />
        </View>

        {/* Iklan banner di paling bawah */}
        <BannerAdComponent />
      </View>
    </SafeAreaView>
   );
};

export default InvestmentDetailList;
