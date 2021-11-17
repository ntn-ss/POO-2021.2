class Tamagotchi {
    private age: number;
    private alive: boolean;
    private diamonds: number;

    private energy: number;
    private readonly energyMax: number;

    private hunger: number;
    private readonly hungerMax: number;

    private clean: number;
    private readonly cleanMax: number;

    constructor(energyMax: number, hungerMax: number, cleanMax: number, age: number=0, alive: boolean=true, diamonds: number=0){
        this.energyMax=energyMax;
        this.hungerMax=hungerMax;
        this.cleanMax=cleanMax;
        this.age=age;
        this.alive=alive;
        this.diamonds=diamonds;

        this.energy=energyMax;
        this.hunger=hungerMax;
        this.clean=cleanMax;
    }

    private testAlive(): boolean{
        if(this.clean<=0 || this.hunger<=0 || this.energy<=0){
            this.alive=false;
            return false;
        }
        else if (this.alive==false){
            return false;
        }
        else{
            return true;
        }
    }

    private verificaFaleceu(): boolean{
        if (this.energy<=0){
            console.log("Morreu de cansaço.");
            this.energy=0;
            console.log(this.toString());
            return true;
        }
        else if (this.hunger<=0){
            console.log("Morreu de fome.");
            this.hunger=0;
            console.log(this.toString());
            return true;
        }
        else if (this.clean<=0){
            console.log("Morreu de sujeira.");
            this.clean=0;
            console.log(this.toString());
            return true;
        }
        return false;
    }

    toString(): string{
        let str=`E: ${this.energy}/${this.energyMax}, S: ${this.hunger}/${this.hungerMax}, L:${this.clean}/${this.cleanMax}, D: ${this.diamonds}, I: ${this.age}.`;
        return str;
    }

    play(): boolean{
        if(this.testAlive()){
            this.energy-=2;
            this.hunger-=1;
            this.clean-=3;
            this.diamonds+=1;
            this.age+=1;
            console.log("Brincou!");
            console.log(this.toString());
            this.verificaFaleceu();
            return true;
        }
        else{
            console.log("Fail: Pet está morto.");
            console.log(this.toString());
            return false;
        }
    }

    eat(): boolean{
        if(this.testAlive()){
            this.energy-=1;
            if (this.hunger<=this.hungerMax-4){
                this.hunger+=4;
            }
            else{
                this.hunger=this.hungerMax;
            }
            this.clean-=2;
            this.age+=1;
            console.log("Comeu!");
            console.log(this.toString());
            this.verificaFaleceu();
            return true;
        }
        else{
            console.log("Fail: Pet está morto.");
            console.log(this.toString());
            return false;
        }
    }

    sleep(): boolean{
        if(this.testAlive()){
            if(this.energy<=this.energyMax-5){
                for(let i=this.energy; i<this.energyMax;i++){
                    this.age+=1;
                }
                this.energy=this.energyMax;
                console.log("Dormiu!");
                console.log(this.toString());
                this.verificaFaleceu();
                return true;
            }
            else{
                console.log("Fail: sem sono.");
                console.log(this.toString());
                return false;
            }
        }
        else{
            console.log("Fail: Pet está morto.");
            console.log(this.toString());
            return false;
        }
    }
    shower(): boolean{
        if(this.testAlive()){
                this.energy-=3;
                this.hunger-=1;
                this.clean=this.cleanMax;
                this.age+=2;
                console.log("Banhou!");
                console.log(this.toString());
                this.verificaFaleceu();
                return true;
        }
        else{
            console.log("Fail: Pet está morto.");
            console.log(this.toString());
            return false;
        }
    }
}

let tamago = new Tamagotchi(20, 20, 20);

tamago.eat();
tamago.play();
tamago.play();
tamago.play();
tamago.shower();
tamago.sleep();
tamago.eat();
tamago.play();
tamago.play();
tamago.play();
tamago.play();
tamago.play();
tamago.play();
tamago.play();