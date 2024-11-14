var roleFarmer = require('role.farmer');
var roleMaintenance = require('role.maintenance');
var roleBuilder = require('role.builder');
var autoSpawn = require('auto.spawn');

module.exports.loop = function () {
    
    autoSpawn.run();
    
         
    for(var name in Game.creeps){
    
    var creep = Game.creeps[name];
    if(creep.memory.role == 'farmer'){
      roleFarmer.run(creep);
    }
    
    
    if(creep.memory.role == 'maintenance'){
      roleMaintenance.run(creep);
    }
    
    if(creep.memory.role == 'builder'){
        roleBuilder.run(creep);
    }
    
  }
}
