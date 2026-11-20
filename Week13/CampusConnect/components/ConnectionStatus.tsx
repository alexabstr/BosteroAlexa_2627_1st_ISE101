
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

function ConnectionStatus() {
  const [status, setStatus] = useState('Checking');

  useEffect(() => {
    // Example side effect: update a status after the component appears.
    setStatus('Ready for Campus Connect');
  }, []);

  return <Text>{status}</Text>;
}
