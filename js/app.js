// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

import DOM from 'react-dom'
import React, {Component} from 'react'

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
	      this.setState({ showResults: true });
	      var minute = document.querySelector('#minute')
		  var second = document.querySelector('#second')

		  var time = (minute.value*60) + parseInt(second.value)
  		  alert(time)
	    },

	    render: function() {
	        return (
	            <div id='startButton'>
	                <input type="submit" value="Start" onClick={this.onClick} />
	                { this.state.showResults ? <GameBox /> : null }
	            </div>
	        );
	    }
	});


	var TimeBox = React.createClass({
		
		_start: function(){
		  var minute = document.querySelector('#minute')
		  var second = document.querySelector('#second')

		  var time = (minute.value*60) + parseInt(second.value)
  		  alert(time)
  		  
		},

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

		_win:0,
		_loss:0,
		_draw:0,

		render:function(){
		  return(


		    <div id='score'>

		      <h3 className='results' >Win:{this._win}</h3>
		      <h3 className='results' >Loss:{this._loss}</h3>
		      <h3 className='results' >Draw:{this._draw}</h3>

		      <div>
		        <div className='icons'>
		          <img src='http://megaicons.net/static/img/icons_sizes/8/178/512/rock-paper-scissors-rock-icon.png' />
		        </div>

		        <div className='icons'>
		          <img src='http://megaicons.net/static/img/icons_sizes/8/178/256/rock-paper-scissors-scissors-icon.png' />
		        </div>

		        <div className='icons'>
		          <img src='http://www.veryicon.com/icon/ico/System/Icons8%20Metro%20Style/Rock%20Paper%20Scissors%20Paper.ico' />
		        </div>
		      </div>



		    </div>





		  )
		}
	})

    DOM.render(<Body />, document.querySelector('.container'))
}

app()