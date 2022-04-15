import React, { Component } from "react";
import { QuizData } from "./QuizData";
import "./App.css";

export class App extends Component {
  state = {
    userAnswer: null,
    currentIndex: 0,
    option: [],
    quizEnd: false,
    score: 0,
    disable: true,
  };

  loadQuiz = () => {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        option: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };

  nextQuestionHadler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  chackAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disable: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question: QuizData[currentIndex].question,
          option: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer,
        };
      });
    }
  }

  finishHandler = () => {
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const { question, option, currentIndex, userAnswer, quizEnd, score } =
      this.state;

    if (quizEnd) {
      return (
        <div>
          <h1>Koniec gry twój wynik to: {this.state.score} </h1>

          <p>
            {this.state.score >= 3
              ? "Możesz zalogować kesza"
              : "nie dostaniesz hasła"}
          </p>
        </div>
      );
    }

    return (
      <div>
        <h2>{question}</h2>
        <span>{`Pytanie ${currentIndex + 1} z ${QuizData.length} `}</span>
        {option.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.chackAnswer(option)}
          >
            {" "}
            {option}{" "}
          </p>
        ))}

        {currentIndex < QuizData.length - 1 && (
          <button
            disabled={this.state.disable}
            onClick={this.nextQuestionHadler}
          >
            Następne pytanie
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button disabled={this.state.disabled} onClick={this.finishHandler}>
            Zaznacz i prześlij wynik
          </button>
        )}
      </div>
    );
  }
}
export default App;
