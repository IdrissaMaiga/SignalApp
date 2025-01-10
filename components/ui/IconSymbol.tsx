import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome
import { SymbolWeight } from 'expo-symbols';

// Add your SFSymbol to MaterialIcons and FontAwesome mappings here.
const MAPPING = {
  // SF Symbols to Material Icons mappings
  'house.fill': 'home',
  'panel.fill': 'admin-panel-settings',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'star.fill': 'star',
  'heart.fill': 'favorite',
  'bell.fill': 'notifications',
  'envelope.fill': 'email',
  'pencil': 'edit',
  'gear': 'settings',
  'camera.fill': 'camera',
  'music.note': 'music-note',
  'mic.fill': 'mic',
  'phone.fill': 'phone',
  'trash.fill': 'delete',
  'map.fill': 'location-on',
  'person.fill': 'person',
  'cloud.fill': 'cloud',
  'lock.fill': 'lock',
  'lock.open.fill': 'lock-open',
  'heart': 'favorite-border',
  'clock.fill': 'access-time',
  'magnifyingglass': 'search',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'plus.circle.fill': 'add-circle',
  'minus.circle.fill': 'remove-circle',
  'share.fill': 'share',
  'camera.circle.fill': 'photo-camera',
  'cart.fill': 'shopping-cart',
  'calendar.fill': 'calendar-today',
  'file.fill': 'insert-drive-file',
  'menu':'menu',
  // Add FontAwesome icon mappings
  'facebook': 'facebook',
  'twitter': 'twitter',
  'instagram': 'instagram',
  'linkedin': 'linkedin',
  'github': 'github',
  'envelope': 'envelope',
  'check': 'check',
  'edit': 'edit',
  'user': 'user',
  'search': 'search',
  'plus': 'plus',
  'minus': 'minus',
  'users': 'users',
  'star': 'star',
  'bell': 'bell',
  "refresh":"refresh"
} as Partial<Record<string, string>>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons or FontAwesome on Android and web. 
 * This ensures a consistent look across platforms, and optimal resource usage.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name];

  // Check if the icon is available in MaterialIcons or FontAwesome, and use the correct icon set
  if (iconName) {
    if (iconName in MaterialIcons.glyphMap) {
      return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
    } else if (iconName in FontAwesome.glyphMap) {
      return <FontAwesome color={color} size={size} name={iconName} style={style} />;
    }
  }

  // Fallback to MaterialIcons as a default
  return <MaterialIcons color={color} size={size} name={iconName || 'home'} style={style} />;
}
