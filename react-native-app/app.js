import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

// Change this to your computer's local IP (not localhost) for mobile testing
// Find it with: ipconfig (Windows) or ifconfig (Mac/Linux)
const API_URL = 'http://10.0.2.2:8080/darija-translator/api/translate';
// 10.0.2.2 is Android emulator's alias for host machine's localhost
// For physical device, use your actual IP e.g. http://192.168.1.100:8080/...

export default function App() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setTranslation('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text }),
      });

      const data = await response.json();

      if (data.translation) {
        setTranslation(data.translation);
      } else {
        setError(data.error || 'Translation failed');
      }
    } catch (err) {
      setError('Could not connect to API. Make sure WildFly is running.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🇲🇦 Darija Translator</Text>
        <Text style={styles.subtitle}>React Native Client</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter English text..."
          placeholderTextColor="#64748b"
          value={text}
          onChangeText={setText}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={translate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text style={styles.buttonText}>Translate to Darija</Text>
          )}
        </TouchableOpacity>

        {translation !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.label}>Translation:</Text>
            <Text style={styles.resultText}>{translation}</Text>
          </View>
        )}

        {error !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#e2e8f0',
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#38bdf8',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#334155',
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  resultText: {
    fontSize: 18,
    color: '#e2e8f0',
    writingDirection: 'rtl',
    lineHeight: 28,
  },
  errorBox: {
    marginTop: 20,
    backgroundColor: '#7f1d1d',
    borderRadius: 12,
    padding: 14,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
  },
});
