import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, KeyboardAvoidingView, ScrollView } from 'react-native';
import MessagesList from '../Components/Chat/MessageList';
import ChatInput from '../Components/Chat/ChatInput';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const Categories = ['Property Type', 'Price Range', 'Location', 'Amenities'];

  const Questions = {
    'Property Type': [
      'What type of property are you looking for?',
      'Are you interested in apartments, houses, or condos?',
      'Do you have a preference for a specific property type?',
    ],
    'Price Range': [
      'What is your budget for a property?',
      'Could you specify your preferred price range?',
      'Are you looking for properties in a specific price range?',
    ],
    'Location': [
      'In which area or city are you searching for properties?',
      'Do you have a preferred location for your property?',
      'Are you looking for properties in a specific neighborhood?',
    ],
    'Amenities': [
      'What amenities are important to you in a property?',
      'Do you have specific amenities in mind?',
      'Any particular amenities you desire in your property?',
    ],
  };

  const Responses = {
    'Property Type': [
      'Great! There are various property types available including apartments, houses, and condos.',
      'Sure! Apartments, houses, and condos are popular choices. What are you leaning towards?',
      'Understood. Knowing your preference helps narrow down the options. What type of property are you interested in?',
    ],
    'Price Range': [
      'Got it! Knowing your budget is crucial. What is your preferred budget for the property?',
      'Sure thing! Specifying your price range will help in finding suitable properties. What budget are you considering?',
      'Thanks for sharing! Having a budget in mind is essential. What range are you looking at for your property?',
    ],
    'Location': [
      'Perfect! Location is key. In which area or city are you looking for properties?',
      'Noted! Finding properties in your preferred location is important. Where are you searching for properties?',
      `Gotcha! Let's narrow down the search. Any specific area or neighborhood in mind for your property?`,
    ],
    'Amenities': [
      'Excellent! Considering amenities is crucial. What amenities are on your priority list for the property?',
      'Got it! Amenities play a significant role. Any specific amenities you are looking for in your property?',
      `Great choice! Let's focus on amenities. What features are you looking for in your property?`,
    ],
  };
  return (
    <KeyboardAvoidingView behavior="paddingVertical" style={{ flex: 1 }}>
      <MessagesList messages={messages} />
      <ChatInput setMessages={setMessages} messages={messages} />
    </KeyboardAvoidingView>
  );
};
export default ChatScreen;
