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
