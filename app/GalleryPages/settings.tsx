import SettingsSwitchRow from '@/components/ui/SettingSwitchButton';
import { useAppTheme } from '@/context/ThemeContext';
import { CONFIG_LIST_SCHEMA, useAppConfig } from '@/hooks/useStoredState';

import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
export default function GallerySettings(){
  const { config, updateConfig, isLoading } = useAppConfig();
  const { colors } = useAppTheme();
   
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          {CONFIG_LIST_SCHEMA.map((item) => (
            <SettingsSwitchRow 
              key={item.id}
              label={item.label} 
              value={config[item.id]} 
              onToggle={() => updateConfig(item.id, !config[item.id])}
            />
            
            
          ))}
        
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
   
        backgroundColor: '#F9FAFB',
      },
      content: {
        padding: 16,
      },
      sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
        marginLeft: 4,
      },
   
    
    });