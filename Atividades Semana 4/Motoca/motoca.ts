class Motorcycle {
    person: Person | null;
    time: number;
    power: number;

    constructor(person: Person | null, time: number, power: number){
        this.person = null;
        this.time=time;
        this.power=power;
    }

    buyTime(money: number): number{
        this.time += money;
        console.log("Tempo comprado: "+this.time+" minutos.");
        return this.time;
    }
    putPerson(person: Person): boolean {
        if (this.person != null) {
            console.log("Já há uma criança na motoca.");
            return false;
        }
        this.person = person;
        return true;
    }

    removePerson(): Person | null {
        if (this.person == null) {
            console.log("Não há criança na motoca.");
            return null;
        }
        this.person = null;
        return this.person;
    }

    toString(): string{
        return `Motoca ${this.person}:${this.time}:${this.power}`;
    }

    drive(dist: number): boolean | void {
        
        if (this.person == null) {
            console.log("Não há criança na motoca.");
            return false;
        }

        let travel = this.time - dist;
        if (travel >= 0) {
            this.time -= travel;
            console.log("Viagem concluída. "+this.time+" minutos sobrando.");
            return true;
        } if (travel < 0) {
            travel*=-1;
            console.log("Viagem parcial: " + travel + " minutos faltantes.");
            this.time = 0;
            return true;
        }
    }
    
    honk(noise: number): string | void{
        if(this.person!=null){
            let sound: string="";
            for(let i=0; i<=noise; i++){
                sound="e".repeat(i);
            }
            return "P"+sound+"m";
        }
        else{
            console.log("Não tem ninguém na motoca. É uma criança fantasma?");
        }
    }
}

class Person{
    name: string;
    age: number;

    constructor(name: string, age: number){
       this.name = name; 
       this.age = age;
    }
}

let carlinhos = new Person ("Carlinhos", 5);
let motoca = new Motorcycle(null, 0, 1);
motoca.honk(10);
motoca.putPerson(carlinhos);
motoca.buyTime(10);
motoca.drive(5);
console.log(motoca.honk(10));
motoca.drive(6);
motoca.removePerson();
