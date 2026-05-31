import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';

interface SettingsSwitchRowProps {
  label: string;
  value: boolean;
  onToggle: () => void;
}

export default function SettingsSwitchRow({ label, value, onToggle }: SettingsSwitchRowProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[
      styles.wrapper, 
      { backgroundColor: value ? colors.tint + '08' : colors.text + '04' }
    ]}>
      <Text style={[styles.label, { color: colors.text, fontWeight: value ? '600' : '500' }]}>
        {label}
      </Text>
      <Switch
        trackColor={{ false: colors.text + '15', true: colors.tint + '30' }}
        thumbColor={value ? colors.tint : '#E5E7EB'}
        ios_backgroundColor={colors.text + '15'}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    letterSpacing: -0.1,
    flex: 1,
    paddingRight: 16,
  },
});