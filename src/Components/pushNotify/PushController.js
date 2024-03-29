import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, {Component} from "react";
// import { PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");
import messaging from "@react-native-firebase/messaging"
import { notificationListener } from "./pushnotification_helper";

export const LocalNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'my-channel', // (required)
      channelName: 'My channel', // (required)
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  PushNotification.localNotification({
    channelId: 'my-channel',
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    date: new Date(new Date().getTime() + 3000),
  });
};
export default class PushController extends Component{
    componentDidMount(){
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
      
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
      
          // process the notification
      
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
      
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
      
          // process the action
        },
      
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
      
        // senderID: "328223454326",
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
      
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });
      notificationListener()
    }

    render(){
        return null;
    }
}