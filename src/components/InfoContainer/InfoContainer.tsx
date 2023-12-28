import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {styles} from './styles';
import {globalStyles} from '@/theme/style';

interface InfoContainerProps {
  value: string | number;
  label: string;
  indicator: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  value,
  label,
  indicator,
}) => {
  return (
    <View
      style={[styles.parentContainer, globalStyles.mt10, globalStyles.mr16]}>
      <View style={styles.valueContainer}>
        <Text style={styles.text1}>{value}</Text>
        <Text style={styles.indicator}>{indicator}</Text>
      </View>

      <Text style={styles.text2}>{label}</Text>
    </View>
  );
};

export {InfoContainer};
