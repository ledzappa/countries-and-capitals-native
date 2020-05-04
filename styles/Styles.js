import {StyleSheet} from 'react-native';

const button = {
  borderRadius: 10,
  marginBottom: 10,
  textAlign: 'center',
  padding: 10,
};

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  scrollView: {
    backgroundColor: '#f1f1f1',
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    ...button,
    backgroundColor: '#474794',
  },
  buttonSecondary: {
    ...button,
    backgroundColor: '#999',
  },
  buttonAnswer: {
    ...button,
    backgroundColor: '#38ad38',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
