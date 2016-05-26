// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

import DOM from 'react-dom'
import React, {Component} from 'react'


// modify the array prototype with a method called .choice(), which will return a random element from the array.

// suggested step 0: modify the prototype with a method that returns a random index in the array.


['a','b','c']

	Array.prototype.choice = function () {
		var upperLimit = this.length
		var lowerLimit = 0 
		var randomIndex = Math.floor(Math.random()*this.length)
		return this[randomIndex]
	}
function app() {



	var Body = React.createClass({

	  render:function () {



		return(
		  <div>
		    <TimeBox />
		    <Start />
		  </div>
		)
	  }
	})

	var Start = React.createClass({
	    getInitialState: function() {
	      return { showResults: false };
	    },

	    onClick: function() {
	      
	      var minute = document.querySelector('#minute')
		  var second = document.querySelector('#second')
		  if(minute.value && second.value){
		  	var time = (parseInt(minute.value)*60) + parseInt(second.value)
		  	this.setState({ showResults: true });
		  }
		  else if(minute.value){
		  	var time = parseInt(minute.value)*60
		  	this.setState({ showResults: true });
		  }
		  else if(second.value){
		  	var time = parseInt(second.value)
		  	this.setState({ showResults: true });
		  }
		  else
		  	{alert('Please input a time')}

		  
  		  this.timer = time
	    },

	    render: function() {
	        return (
	            <div>
	                <input id='startButton' type="submit" value="Start" onClick={this.onClick} />
	                { this.state.showResults ? <GameBox time={this.timer}/> : null }
	            </div>
	        );
	    }
	});


	var TimeBox = React.createClass({

		render:function () {
		  return(
			<div>
			  <div id='title'>
			    <h1 id='title'>Paper Rock Scissors</h1>
			  </div>

			  <div id='timeBar'>
			    <h3>How long do you want to play?</h3>
				
				<input placeholder='Minutes' id='minute' />
			
				<input placeholder='Seconds' id='second'/>
				
			  </div>
			</div>
		  )
		}
	})

	var GameBox = React.createClass({

		componentWillMount: function (){
			var self = this
			var clear = setInterval(function(){
				

				if(self.state.time <= 0){
					clearInterval(clear)
				}

				else {
					self.setState({
						time:self.state.time -1
					})
				}
				
			},1000)
		},

		weapons: {
			rock: {
				predator: 'paper',
				prey: 'scissors'
			},
			scissors: {
				predator: 'rock',
				prey: 'paper'
			},
			paper: {
				predator: 'scissors',
				prey: 'rock'
			}
		},

		_win:0,
		_loss:0,
		_draw:0,

		_challenge:function(evt){
			var usrChoice = evt.target.value
			var choices = [<img weapon='rock' src='http://megaicons.net/static/img/icons_sizes/8/178/512/rock-paper-scissors-rock-icon.png' />,
				<img weapon='scissors' src='http://megaicons.net/static/img/icons_sizes/8/178/256/rock-paper-scissors-scissors-icon.png' />,
				<img weapon='paper' src='http://www.veryicon.com/icon/ico/System/Icons8%20Metro%20Style/Rock%20Paper%20Scissors%20Paper.ico' />]
			
			var computerChoice = choices.choice()

			var computerWeapon = computerChoice.props.weapon

			var win = 0,
				loss = 0,
				draw = 0

			var usrChoiceData = this.weapons[usrChoice]

			if (computerChoice.props.weapon === usrChoiceData.predator) {
				loss = 1
			}
			else if (computerChoice.props.weapon === usrChoiceData.prey) {
				win = 1
			}
			else {
				draw = 1
			}
			// 
			this.setState({
				computerChoice: computerChoice,
				wins: this.state.wins + win,
				losses: this.state.losses + loss,
				draws: this.state.draws + draw
			})
		},

		getInitialState: function() {
			return {
				computerChoice: '',
				wins: 0,
				losses: 0,
				draws: 0,
				time: this.props.time
			}
		},

		startOver:function(){

			this.setState({
				computerChoice: '',
				wins: 0,
				losses: 0,
				draws: 0,
				time: 0
			})
		},


		render:function(){

			var controlStyle = {display:'block'}
			var warning = {
			  display:'none',
			}
			if (this.state.time < 11) warning.display = 'block'
			if (this.state.time < 1){
				controlStyle.display = 'none'
				if(this.state.wins> this.state.losses){
					alert('Congratulations, you win!!!')
				}
				else if (this.state.wins === this.state.losses){
					alert("It's a draw!")
				}
				else {
					alert('You lost, better luck next time.')
				}
			} 

		  return(

		    <div id='gameSpace'>
		      <div id='timer'>
		        <h3 >Seconds remaining: {this.state.time}</h3>
		      </div>
		      
		      <div style={warning}>
		        <h3 id='warning'>Less than 10 seconds remaining!</h3>
		      </div>

		      <div className='score'>
		        <h3 >Win:{this.state.wins}</h3>
		      </div>
		      <div className='score'>
		        <h3 >Loss:{this.state.losses}</h3>
		      </div>
		      <div className='score'>
		        <h3 >Draw:{this.state.draws}</h3>
		      </div>

		      <div style={controlStyle}>
		        
		        <h3 id='instruction'>Click wisely:</h3>

		        <button className='icons' value='rock' data-victim='scissors' onClick={this._challenge}>
		          <img value='rock' src='http://megaicons.net/static/img/icons_sizes/8/178/512/rock-paper-scissors-rock-icon.png' />
		        </button>

		        <button className='icons' value='scissors' data-victim='paper' onClick={this._challenge}>
		          <img value='scissors' src='http://megaicons.net/static/img/icons_sizes/8/178/256/rock-paper-scissors-scissors-icon.png' />
		        </button>

		        <button className='icons' value='paper' data-victim='rock' onClick={this._challenge}>
		          <img value='paper' src='http://www.veryicon.com/icon/ico/System/Icons8%20Metro%20Style/Rock%20Paper%20Scissors%20Paper.ico' />
		        </button>
		   

		        <h3> VS </h3>

		        <div id='computerChoice'>
		      		{this.state.computerChoice}
		        </div>
		    </div>

		      <button id='reset' onClick={this.startOver}> Reset </button>




		    </div>





		  )
		}
	})

    DOM.render(<Body />, document.querySelector('.container'))
}

app()