import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android" ? true : false;
export const isIos = !isAndroid;
export const DbInventory = "inventory";
export const DbWifi = "wifi_portal";
export const DbWifiDoc = "wifi_id";