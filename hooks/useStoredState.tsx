import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CONFIG_STORAGE_KEY = 'app_global_configuration_center';

export interface AppConfig {
  darkMode: boolean;
  pushNotifications: boolean;
  database: boolean;
}

export interface ConfigItemSchema {
  id: keyof AppConfig;
  label: string;
  defaultValue: boolean;
}

export const CONFIG_LIST_SCHEMA: ConfigItemSchema[] = [
  { id: 'darkMode', label: 'Dark Interface Mode', defaultValue: false },
  { id: 'pushNotifications', label: 'Push Notifications', defaultValue: true },
  { id: 'database', label: 'Read from local storage', defaultValue: false },
];

const defaultSettings = CONFIG_LIST_SCHEMA.reduce((acc, current) => {
  acc[current.id] = current.defaultValue;
  return acc;
}, {} as AppConfig);

const ConfigCenterContext = createContext({
  config: defaultSettings,
  updateConfig: async (key: keyof AppConfig, value: boolean) => {},
  isLoading: true,
});

export function ConfigCenterProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAllConfigs() {
      try {
        const storedJson = await SecureStore.getItemAsync(CONFIG_STORAGE_KEY);
        if (storedJson) {
          setConfig(JSON.parse(storedJson));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllConfigs();
  }, []);

  const updateConfig = async (key: keyof AppConfig, value: boolean) => {
    const updatedConfig = { ...config, [key]: value };
    setConfig(updatedConfig);

    try {
      await SecureStore.setItemAsync(CONFIG_STORAGE_KEY, JSON.stringify(updatedConfig));
    } catch (error) {
      console.error(error);
      setConfig(config);
    }
  };

  return (
    <ConfigCenterContext.Provider value={{ config, updateConfig, isLoading }}>
      {children}
    </ConfigCenterContext.Provider>
  );
}

export const useAppConfig = () => useContext(ConfigCenterContext);