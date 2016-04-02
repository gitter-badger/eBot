function Match(server, player, map, config) {
	
	this.id 		= -1;
	
	this.rcon		= server.rcon
	
	this.server		= server;
	this.map 		= map;
	this.player		= player;
	
	this.pauses		= 0;
}

Match.prototype.pause = function(time, reason) {

	if(pauses < 1) {
		
		this.rcon.sendCommand('pause');
		
		this.broadcast("The Game is paused. (Reason: \""+ reason +"\")");
	} else {
		
		this.broadcast("The Game is paused. (Reason: \""+ reason +"\")");
		this.broadcast("This Pause will be stacked up the queue. If all pauses stacked are ending, the game will be resumed. (Pauses in Queue: "+ pauses +")");
	}
	
	pauses++;
	
	this.unpause(time);
}

Match.prototype.unpause = function(id, time) {
	
	if(time > 0) {
		
		pauses--;
		
		if(pauses < 1) {
			
			this.rcon.sendCommand('unpause');
			this.broadcast("The Game is unpaused.");
		} else {
			
			this.broadcast("If all pauses stacked are ending, the game will be resumed. (Pauses in Queue: "+ pauses +")");
		}
	} else {
		
		if(time < 10)
			this.broadcast("The Game will be unpaused in " + time + " seconds.");
		else if(time % 30 == 0)
			this.broadcast("The Game will be unpaused in " + time + " seconds.");
		
		setTimeout(function() {
			
			this.unpause(time - 1);
		}.bind(this), 1000);
	}
}

Match.prototype.restart = function(time) {
	
	this.rcon.sendCommand('mp_restart ' + time);
}

Match.prototype.kick = function(player) {
	
	
}

Match.prototype.broadcast = function(msg) {
	
	
}

Match.prototype.msg = function(msg, player) {
	
	
}