# screeps
code base designed to play screeps.


In order to keep track fo where I began I am imortalizing the files I first launched my first ever colony with in this document. There are five initial files ( main.js role.farmer.js role.maintenance.js role.builder.js & auto.spawn.js). One note a large poition of this initial code come froma a compination of the screeps tutorial and one or two youtubers. I did first take the time to understand it and amke some adjustments that will hopefully lend itself to some of the changes I plan to implement moving forward.

////////   main.js   ////////

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

//////    role.farmer.js     //////

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


/////    role.maintenance.js    /////

var roleMaintenance = {
  run: function(creep){
    
    if(creep.memory.maintaining){
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
      }
      if(creep.carry.energy == 0){
        creep.memory.maintaining = false;
      }
    }else{
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
        creep.moveTo(sources[0]);
      }
      if(creep.carry.energy == creep.store.getCapacity()){
        creep.memory.maintaining = true;
      }
    }
    
  }
};

module.exports = roleMaintenance;

/////  role.builder.js     /////

var roleBuilder = {
    run: function(creep){
        
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
    }
};

module.exports = roleBuilder;

/////     auto.spawn.js     /////


 var autoSpawn = {
     
     run: function(){
         
         var farmerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'farmer');
         var maintainerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintainer');
         var builderCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
         
         if(farmerCount.length < 2){
             Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], 'farmer' + Game.time ,{memory:{role:'farmer', farming: false}});
         }else if(maintainerCount.length < 3){
             Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], 'maintainer' + Game.time ,{memory:{role:'maintainer', maintaining: false}});
         }else if(builderCount.length < 1){
             Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], 'builder' + Game.time ,{memory:{role:'builder', building: false}});
         }
     }
 };

module.exports = autoSpawn;
