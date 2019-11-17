import React, { Component } from 'react';
import './App.css';
import Formulaire from './formulaire';
import BodyMap from './BodyMap';
import SockJsClient from 'react-stomp';

class App extends Component {
  constructor(props){
    super(props)
    this.handleEvent = this.handleEvent.bind(this);
  }
  state = {roundPhase:null, territories:{}, players:null, userInfos:"null", receivedMessageChange: null, game:null}

  retrieveMySessionId = async (userName) => {
    try{
      let response = await fetch(`http://localhost:8080/restoregame/${userName}`);
      if(response.ok){
          let data = await response.text()
          if(data == null || data == 'undefined' || data != ""){
            console.log("COMPLETE");
            localStorage.setItem('sessionId', data);
          }
          console.log(localStorage.getItem('sessionId'));
          console.log(data);
          throw new Error(response.statusText);
      }
  }
  catch(err){
  }
  }

  sendMessage = async (msg) => {
    this.clientRef.sendMessage('/app/message', msg);
  }

  sendMessageInitiliazePhase = async () => {
    await this.clientRef.sendMessage('/app/initializegame', "msg");
  }

  sendMessageAddPlayer = async (msg) => {
    this.setState({userInfos: msg});
    this.clientRef.sendMessage('/app/getPlayerJoined', msg);
  }

  sendMessageCloseMoveFortifyPhase = async () => {
    this.clientRef.sendMessage('/app/closemovefortifystep', "");
  }

  sendMessageGetTerritories = async () => {
    console.log("GET TERRITORIES");
    this.clientRef.sendMessage('/app/territories', "");
  }

  sendMessageToAddPawns = async (territory, nbOfPawns) => {
    let AddPawnsInfos = [territory, nbOfPawns];
    await this.clientRef.sendMessage('/app/addpawn', JSON.stringify(AddPawnsInfos));
  }

  sendMessageToFight = async (territoryAttacker, territoryDefender, nbOfPawns) => {
    let fightInfos = [territoryAttacker, territoryDefender, nbOfPawns];
    await this.clientRef.sendMessage('/app/fight', JSON.stringify(fightInfos));
  }

  sendMessageToAnswerFight = async (nbdef) => {
    await this.clientRef.sendMessage('/app/answerfight', JSON.stringify(nbdef));
  }

  sendMessageToMovePawns = async (territoryA, territoryB, nbOfPawns) => {
    let movePawnsInfos = [territoryA, territoryB, nbOfPawns];
    await this.clientRef.sendMessage('/app/movefortify', JSON.stringify(movePawnsInfos));
  }

  sendMessageToCloseFightStep = async () =>{
    this.clientRef.sendMessage('/app/closefightstep', "");
  }

  messageReceived = async (msg) => {
    if(typeof msg.playerList != 'undefined'){
      let territoriesReceived = msg.territories.map((territories) => { return [territories.id, territories.name.toLowerCase(), territories.pawn, territories.player.name, territories.player.id]});
       await this.setState({roundPhase:msg.phase ,territories:territoriesReceived.sort(function(a, b) {return a[0] - b[0];}), players:msg.playerList, game:msg});
       console.log("ORDERED TERRITORIES ?");
       console.log(this.state.territories);
    }
    else{
      this.setState({players:msg});
    }
    
        this.state.players.forEach((player) => {
          if(player.sessionId === localStorage.getItem('sessionId')){
            this.setState({userInfos : player.name});
          }
        })  
    
    console.log(localStorage.getItem('sessionId'));
    console.log(this.state.game);
  }

  handleEvent(phase){
    this.componentDidMount();
    console.log("event sent");
  }

  render() {
    return (
      
      <div className="App">
        <SockJsClient url='http://localhost:8080/sicknesstorm' topics={['/topic/message']} onMessage={this.messageReceived}  ref={ (client) => { this.clientRef = client; }} />
        {this.state.roundPhase == "INITIALIZE" ? <Formulaire updatephase={this.handleEvent} sendMessage={this.sendMessageAddPlayer} sendMessageInitiliazePhase={this.sendMessageInitiliazePhase} players={this.state.players}/> : ""}
        {this.state.roundPhase != "INITIALIZE" && this.state.players != null ? <BodyMap retrieveMySessionId={this.retrieveMySessionId} sendMessageToCloseFightStep={this.sendMessageToCloseFightStep} sendMessageToMovePawns={this.sendMessageToMovePawns} sendMessageToAnswerFight={this.sendMessageToAnswerFight} sendMessageToFight={this.sendMessageToFight} sendMessageToAddPawns={this.sendMessageToAddPawns} territories={this.state.territories} sendMessageGetTerritories={ this.sendMessageGetTerritories} sendMessage={this.sendMessage} sendMessageCloseMoveFortifyPhase={this.sendMessageCloseMoveFortifyPhase} players={this.state.players} game={this.state.game} userName={this.state.userInfos}/> : "LOADING..."}
      </div>
    );
  }
}

export default App;
