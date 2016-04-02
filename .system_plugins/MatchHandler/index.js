var EventEmitter 	= require('events').EventEmitter;
var util	 		= require('util');

function MatchHandler() {
	
	this.id			= -1;
	this.pid		= -1;
	
	this.active		= false;
	this.priority	= 0;
	
	this.im 		= null;
}

util.inherits(MatchHandler, EventEmitter);

MatchHandler.prototype.start = function(pid, im) {
	
	this.__run(pid, im);
	
	this.im.add('MatchHandler', this);
	
	this.emit('im', this.im);
}

MatchHandler.prototype.__run = function(pid, im) {
	
	this.pid 		= pid;
	this.active 	= true;
	
	this.im 		= im;
	
	this.on('im', function(im) {
		
		this.im = im;
	}.bind(this));
}

MatchHandler.prototype.stop = function() {
	
	this.__stop();
}

MatchHandler.prototype.__stop = function() {
	
	this.pid = -1;
	this.active = false;
	
	this.im = null;
}

MatchHandler.prototype.addMatch = function(config) {
	
	var format 	= typeof config.format !== 'undefined' ? config.format : MatchConfig.Format.BO1;
	var lo3 	= typeof config.lo3 !== 'undefined' ? config.lo3 : true;
	
	var file	= typeof config.file !== 'undefined' ? config.file : "";
	
	var player	= typeof config.player !== 'undefined' ? config.player : [];
}

module.exports = new MatchHandler();