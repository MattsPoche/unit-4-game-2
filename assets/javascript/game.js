$(document).ready(function(){
    //Fighter class declaration
    let Fighter = class{
        constructor(hp, ap, cap, name, imgStr){
            this.hp = hp;
            this.ap = ap;
            this.cap= cap;
            this.name = name;
            this.numAtt = 1;  
            this.imgStr = imgStr;          
        }
        getHp(){
            return this.hp;
        }
        getAp(){
            return this.ap * this.numAtt;
        }
        getCap(){
            return this.cap;
        }
        getName(){
            return this.name;
        }
        getNumAtt(){
            return this.numAtt;
        }
        getImgStr(){
            return this.imgStr;
        }
        defend(attack){
            this.hp -= attack;
        }
        setAp(ap){
            this.ap = ap;
        }   
        setNumAtt(numAtt){
            this.numAtt = numAtt;
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
            fdiv.append("<img class='fighterimg' src='assets/images/"+fighters[i].getImgStr()+"' alt='"+fighters[i].getName()+"' >");
            fdiv.append("<div class='fighterstat' id='name'>"+fighters[i].getName()+"</div>");
            fdiv.append("<div class='fighterstat' id='hp'> Health: "+fighters[i].getHp()+"</div>");
            fdiv.append("<div class='fighterstat' id='ap'> Attack: "+fighters[i].getAp()+"</div>");
            fdiv.append("<div class='fighterstat' id='cap'> Counter Attack: "+fighters[i].getCap()+"</div>");

            $("#bench").append(fdiv);
        }
    };
    
    //tests if an element is empty
    // var isEmpty = function( el ){
    //     return !$.trim(el.html());
    // }

    //displays ui text
    var displayText = function(fighters){
        $(".fighter").each(function(index){
            var f = fighters[$(this).attr("data-index")];
            $(this).children("#hp").text("Health: "+f.getHp());
            $(this).children("#ap").text("Attack: "+f.getAp());
            $(this).children("#cap").text("Counter Attack: "+f.getCap());
            switch(state){
                case gameState.PLAYER_SELECT:
                    $("#info").text("Choose your Character!!");
                    break;
                case gameState.DEFENDER_SELECT:
                    $("#info").text("Choose your Opponent!!");
                    break;
                case gameState.BATTLE:
                    $("#info").text("Attack!!");
                    break;
                case gameState.GAME_END:
                    $("#info").text("Game Over");
                    break;
            }

        });
    };

    //global vars
    var fighters = [];
    fighters.push(new Fighter(100, 5, 6, "Luke Skywalker", "LukeSkywalker.png"));
    fighters.push(new Fighter(120, 6, 6, "Obi-Wan Kenobi", "Obi-Wan-Kenobi.png"));
    fighters.push(new Fighter(150, 10, 7, "Darth Sidious", "DarthSidious.png"));
    fighters.push(new Fighter(180, 10, 9, "Darth Vader", "DarthVader.png"));
    let state = gameState.PLAYER_SELECT;
    addFighters(fighters);

    //on-click events
    $(".fighter").on("click", function(){
        if($(this).parent().attr("id") === "bench"){
            if(state != gameState.GAME_END){
                switch(state){
                    case gameState.PLAYER_SELECT:
                        var player = $(this);            
                        $("#yourCharacter").append(player);
                        state = gameState.DEFENDER_SELECT;
                        break;
                    case gameState.DEFENDER_SELECT:
                        var defender = $(this);
                        $("#defender").append(defender);
                        state = gameState.BATTLE;
                        break;
                }
                displayText(fighters);
            }
        }
    });
    $("#attackButton").on("click", function(){
        if(state === gameState.BATTLE){
            var player = $("#yourCharacter").children(".fighter").attr("data-index");
            var defender = $("#defender").children(".fighter").attr("data-index");
            fighters[defender].defend(fighters[player].getAp());
            fighters[player].setNumAtt(fighters[player].getNumAtt()  + 1);
            fighters[player].defend(fighters[defender].getCap());
            
            //Conditionals
            if(fighters[player].getHp() <= 0){
                $("#yourCharacter").children(".fighter").remove();
                state = gameState.GAME_END;
            }else if(fighters[defender].getHp() <= 0){
                $("#defender").children(".fighter").remove();
                state = gameState.DEFENDER_SELECT;
            }
            //console.log(isEmpty($("#defender")));
            console.log($("#bench").children().length );
            console.log( $("#defender").children().length);
            if( $("#bench").children().length === 0 && $("#defender").children().length === 1 ){
                state = gameState.GAME_END;
            }
            
            displayText(fighters);
        }
    });
});