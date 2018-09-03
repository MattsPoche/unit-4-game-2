$(document).ready(function(){
    //Fighter class declaration
    let Fighter = class{
        constructor(hp, ap, cap, name){
            this.hp = hp;
            this.ap = ap;
            this.cap= cap;
            this.name = name;            
        }
        getHp(){
            return this.hp;
        }
        getAp(){
            return this.ap;
        }
        getCap(){
            return this.cap;
        }
        getName(){
            return this.name;
        }
        defend(attack){
            this.hp -= attack;
        }
        setAp(ap){
            this.ap = ap;
        }        
    };

    //gameState enum
    const gameState = {
        PLAYER_SELECT: "playerselect",
        DEFENDER_SELECT: "defenderselect",
        BATTLE: "battle",
        GAME_END: "gameend"
    };

    //function to dynamicly add fighters to the DOM
    var addFighters = function(fighters){
        for(var i = 0; i < fighters.length; i++){
            var fdiv = $("<div>");
            fdiv.addClass("fighter");
            fdiv.attr("data-index", i);
            fdiv.text(fighters[i].getName());

            $("#bench").append(fdiv);
        }
    };

    //global vars
    var fighters = [];
    fighters.push(new Fighter(100, 4, 6, "Luke Skywalker"));
    fighters.push(new Fighter(120, 6, 6, "Obi-Wan Kenobi"));
    fighters.push(new Fighter(150, 10, 7, "Darth Sidious"));
    fighters.push(new Fighter(180, 10, 10, "Darth Vader"));
    let state = gameState.PLAYER_SELECT;
    addFighters(fighters);
    
    
    
    
    //on-click events
    $(".fighter").on("click", (event) => {
        switch(state){
            case gameState.PLAYER_SELECT:
                var player = $(event.target);            
                $("#yourCharacter").append(player);
                state = gameState.DEFENDER_SELECT;
                break;
            case gameState.DEFENDER_SELECT:
                var defender = $(event.target);
                $("#defender").append(defender);
                state = gameState.BATTLE;
                break;
        }
    });
    $("#attackButton").on("click", function(){
        if(state === gameState.BATTLE){
            var player = $("#yourCharacter").children(".fighter").attr("data-index");
            var defender = $("#defender").children(".fighter").attr("data-index");
            fighters[defender].defend(fighters[player].getAp());
            fighters[player].setAp(fighters[player].getAp() * 2);
            fighters[player].defend(fighters[defender].getCap());
            console.log(fighters[player].getHp()+" "+fighters[defender].getHp());
            if(fighters[player].getHp() <= 0){
                $("#yourCharacter").children(".fighter").remove();
            }else if(fighters[defender].getHp() <= 0){
                $("#defender").children(".fighter").remove();
                state = gameState.DEFENDER_SELECT;
            }
        }
    });
});