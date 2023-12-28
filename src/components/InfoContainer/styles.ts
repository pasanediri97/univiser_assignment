import {COLORS} from '@/theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text1: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 10,
    color: COLORS.white, 
    fontWeight:'400'
  },
  parentContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    width: '20%',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  indicator: {
    fontSize: 14,
    marginTop: 2,
    marginLeft:2,
    color: COLORS.white,
  },
});
