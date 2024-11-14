var roleFarmer = {
  run: function(creep){
    
        if(creep.carry.energy == 0){
          creep.memory.farming = true;
        }
    
        if(creep.carry.energy == creep.store.getCapacity()){
          creep.memory.farming = false;
        }
      
        if(creep.memory.farming){
          var sources = creep.room.find(FIND_SOURCES);
          
              if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0]);
              }
             
        }else{
            
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns['Spawn1']);
            }
         }
    
  }
};

module.exports = roleFarmer;
