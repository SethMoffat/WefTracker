import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

const NewsScraper = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://webscraper.io/test-sites/e-commerce/allinone');
        const articles = response.data;
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {Array.isArray(articles) && articles.map((article, index) => (
        <View key={index} style={styles.articleContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.content}>{article.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  articleContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default NewsScraper;