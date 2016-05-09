/// <reference path="Die.ts" />
/// <reference path="Enums.ts"/>

class DiceUI {
    
    containerDiv: HTMLDivElement;
    die1: Die;
    die2: Die;
    
    constructor(player: Player) {        
        this.containerDiv = document.createElement('div');
        this.containerDiv.className = `dice-container dice-container-${Player[player].toLowerCase()}`;
    }
    
    setDiceRolls(die1: Die, die2: Die) {
        this.die1 = die1;
        this.die1.onChange = () => { this.redraw(); };
        this.die2 = die2;
        this.die2.onChange = () => { this.redraw(); };
        
        this.redraw();
    }
    
    setActive(active: boolean) {
        if (active) {
            $(this.containerDiv).addClass('active');
        }
        else {
            $(this.containerDiv).removeClass('active');            
        }
    }
    
    private redraw(): void {
        Utils.removeAllChildren(this.containerDiv);
        this.containerDiv.appendChild(DiceUI.createDie(this.die1));
        this.containerDiv.appendChild(DiceUI.createDie(this.die2));
    }
    
    private static createDie(die: Die): HTMLDivElement {
        let div = document.createElement('div');
        div.className = 'die die-uses-' + die.remainingUses;
        div.innerText = die.value.toString();
        return div;
    }
}