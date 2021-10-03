import { post } from "jquery";
import React from "react";
import "./Player.css";
import * as $ from "jquery";
import hash from "./hash";
import prev from "./assets/prev.png";
import nextI from "./assets/next.png";
import playI from "./assets/play.png";
import pauseI from "./assets/pause.png";

var playPauseImg = pauseI;

const Player = props => {
  const backgroundStyles = {
    backgroundImage:`url(${
      props.item.album.images[0].url
    })`,
  };

  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };

  const token = hash.access_token;
  console.log(token);
  function previous(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/previous",
      type: "POST",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
    });
  }

  function pause(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/pause",
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
    });
  }

  function play(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/play",
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
    });
  }

  function playPause(token) {
    if (props.is_playing) {
      playPauseImg = pauseI;
      pause(token);
    } else {
      playPauseImg = playI;
      play(token);
    }
  }

  function next(token) {
    // Make a call using the token
    console.log("function called");
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/next",
      type: "POST",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
    });
  }


  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} alt ="" />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
      <div className ="username">
        <p>Logged in as {props.username}</p>
      </div>
      <div className = "buttons">
        <button class = "prev"><img src={prev} alt="" onClick={previous(token)} /></button>
        <button class = "playPause"><img src={playPauseImg} alt ="" onClick={playPause(token)} /></button>
        <button class = "next"><img src={nextI} alt="" onClick={next(token)} /></button>
      </div>
      <div className = "disclaimer">
        <p>Heads up: Play/Pause and Track Skipping Requires Spotify Premium</p>
      </div>
    </div>
  );
}

export default Player;
