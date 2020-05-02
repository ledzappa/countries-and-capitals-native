import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#eee',
  },
  flag: {
    width: 10,
    height: 10,
  },
  flagView: {
    width: 1,
    height: 100
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#666',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
  },
  buttonAnswer: {
    borderRadius: 10,
    backgroundColor: '#38ad38',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
  },
});
