import React from "react";
import "./App.css";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAskingFor: "mobile",
      message: "TELL YOUR MOBILE NUMBER",
      data: {
        mobile: "",
        password: ""
      }
    };
    this.synth = window.speechSynthesis;
    this.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new this.SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;
    this.recognition.onresult = event => {
      const speechToText = event.results[0][0].transcript;
      console.log(speechToText);
      if (speechToText.length != 0) {
        if (this.state.data.mobile.length === 0) {
          this.setState({
            dataAskingFor: "password",
            message: "TELL YOUR PASSWORD",
            data: {
              mobile: speechToText.split(" ").join(""),
              password: ""
            }
          });
        } else if (this.state.data.password.length === 0) {
          this.setState({
            data: {
              password: speechToText.split(" ").join(""),
              mobile: this.state.data.mobile
            }
          });
        }
      }
    };
  }

  say = text => {
    const utter = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utter.voice = voices[10];
    console.log(voices);
    utter.rate = 0.8;
    this.synth.speak(utter);
  };

  sayAndListen = async text => {
    this.recognition.stop();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utter.voice = voices[10];
    console.log(voices);
    utter.rate = 0.8;
    this.synth.speak(utter);
    await this.recognition.start();
  };

  listen = () => {
    this.recognition.start();
  };

  componentDidMount() {
    this.sayAndListen(this.state.message);
  }

  componentDidUpdate() {
    if (this.state.data.password.length === 0) {
      this.sayAndListen(this.state.message);
    } else {
      this.say("Wait until we check your credentials");

      fetch("http://localhost:5000/user/login", {
        method: "POST",
        body: JSON.stringify({
          mobile: this.state.data.mobile,
          password: this.state.data.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === true) {
            this.say("Logged in successfully");
          } else {
            if (data.reason === "mobile") {
              this.say("No such user");
            } else if (data.reason === "password") {
              this.say("wrong password");
            }
          }
        });
    }
  }

  render() {
    return <div className="Login">{this.state.message}</div>;
  }
}

export default Index;
