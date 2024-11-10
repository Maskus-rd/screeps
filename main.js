var roleFarmer = require('role.farmer');
var roleMaintenance = require('role.maintenance');

module.exports.loop = function () {

  for(var name in Game.creeps){
    var creep = Game.creeps[name];
    if(creep.memory.role == 'farmer'){
      roleFarmer.run(creep);
    }
    if(creep.memory.role == 'maintenance'){
      roleMaintenance.run(creep);
    }
  }
}
