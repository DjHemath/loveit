import React from "react";
import "./App.css";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.synth = window.speechSynthesis;
    this.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new this.SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;
    this.recognition.onresult = event => {
      const speechToText = event.results[0][0].transcript;
      console.log(speechToText);
      if (speechToText === "login") {
        this.props.history.push("/login");
      } else if (speechToText === "sign up" || speechToText === "signup") {
        console.log("Sign up");
      }
    };
  }

  say = text => {
    const utter = new SpeechSynthesisUtterance(text);
    const voices = this.synth.getVoices();
    utter.voice = voices[10];
    utter.rate = 0.8;
    this.synth.speak(utter);
    this.listen();
  };

  listen = () => {
    this.recognition.start();
  };

  componentDidMount() {
    this.say("Login or Signup");
  }
  render() {
    return <div className="Index">Login or Signup</div>;
  }
}

export default Index;
