var IServer = require('server');
var Plugins = require('plugin-system');
var path 	= require('path');
var fs 		= require('fs');

var pm = new Plugins.PluginManager();
var pl = new Plugins.PluginLoader('.system_plugins');

pl.on('plugin', function(info, dir) {
	
	fs.accessSync(dir + path.sep + info.main)
		
	var plugin 	= require("." + "/" + dir + "/" + info.main);
	
	var id 		= pm.add(plugin);
	
	if(id > -1) {
		
		pm.start(id);
		console.log(info.name + "@" + info.version, "started.");
	} else {
		
		console.log(info.name + "@" + info.version, "not started.")
	}
})