import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingHorizontal: 20, paddingTop: 60, marginBottom: 10 },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#111827' },
  headerTitleSmall: { fontSize: 18, fontWeight: '700', color: '#111827', marginLeft: 15 },
  headerSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  folderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  folderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderInfo: { flex: 1, marginLeft: 15 },
  folderName: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  folderDetails: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  galleryImage: {
    width: width / 3 - 4,
    height: width / 3 - 4,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#E5E7EB'
  },
  emptyState: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#9CA3AF', marginTop: 10, fontSize: 16 },
});