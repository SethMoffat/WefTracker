import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import cheerio from 'cheerio';

// Function to fetch and parse the article from the given URL
async function getArticle(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Use cheerio to parse the HTML and extract the article content
    const $ = cheerio.load(html);
    const articleContent = $('.article-content').text().trim(); // Trim extra whitespace

    return articleContent;
  } catch (error) {
    console.error('Error fetching article:', error);
    return ''; // Return empty string to prevent rendering errors
  }
}

export default function FeedScreen() {
  const [articles, setArticles] = useState([]);

  // Fetch the article when the component mounts
  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticle('https://www.weforum.org/press/in-the-news/');
      setArticles([article]);
    };

    fetchArticle();
  }, []);

  return (
    <ScrollView>
      {articles.map((article, index) => (
        <View key={index}>
          <Text>{article}</Text>
        </View>
      ))}
    </ScrollView>
  );
}