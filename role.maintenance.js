var roleMaintenance = {
  run: function(creep){
    if(creep.memory.maintaining){
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
      }
      if(creep.carry.energy == 0){
        creep.memory.maintaining = false;
      }
    }
    else{
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0] == ERR_NOT_IN_RANGE){
        creep.moveTo(sources[0]);
      }
      if(creep.carry.energy == creep.store.getCapacity()){
        creep.memory.maintaining = true;
      }
    }
  }
};

module.exports = roleMaintenance;
