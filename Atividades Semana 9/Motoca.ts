const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

let logger: Array<Person>=[];

class Motorcycle {
    person: Person | null;
    time: number;

    constructor(person: Person | null, time: number){
        this.person = null;
        this.time=time;
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
        return `Montado: ${this.person}, Tempo: ${this.time}`;
    }

    drive(dist: number): boolean | void {
        
        if (this.person == null) {
            console.log("Não há criança na motoca.");
            return false;
        }

        let travel = this.time - dist;
        if (travel >= 0) {
            this.time = travel;
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
            console.log("P"+sound+"m");
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
       logger.push(this);
    }
    toString(){
        return this.name;
    }
}

class IO {

    moto: Motorcycle;

    create_kid(): Person {
        write("Digite o nome da criança: ");
        let name = input();

        write("Digite a idade da criança. ");
        let age = Number(input());

        let kid = new Person(name, age);
        return kid;
    }

    create_motorcycle(): Motorcycle {
        write("A moto começará com que tempo? ");
        let time = Number(input());

        this.moto = new Motorcycle(null, time);
        return this.moto;
    }

    findKid(name: string, age: number): boolean{
        for (let i=0;i<logger.length;i++){
            if (logger[i].name==name&&logger[i].age==age){
                this.moto.putPerson(logger[i]);
                return true;
            }
        }
        console.log("Não achamos essa criança.");
        return false;
    }

    show_help(){
        write ("Comandos:\n");
        write (" init moto: cria uma nova moto\n");
        write (" init kid: cria um novo menino\n");
        write (" show: mostra o estado da motoca\n");
        write (" drive <distância>: dirige a motoca pela distância desejada\n");
        write (" putKid <nome> <idade>: põe tal criança na motoca\n");
        write (" honk <potência>: buzina com a potência desejada\n");
        write (" buyTime <dinheiro>: aumenta o tempo com base no dinheiro\n");
        write (" remove: retira alguém da motoca, se houver\n");
        write (" end: sai do programa\n");
    }

    shell(){
        this.create_motorcycle();
        this.show_help();
        while (true){
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0]=="help"){
                this.show_help();
            } else if (words[0]=="end"){
                break;
            } else if (words[0]=="show"){
                write("" + this.moto + "\n");
            } else if (words[0]=="drive"){
                this.moto.drive(Number(words[1]));
            } else if (words[0]=="honk"){
                this.moto.honk(Number(words[1]));
            } else if (words[0]=="buyTime"){
                this.moto.buyTime(Number(words[1]));
            } else if (words[0]=="putKid"){
                this.findKid(words[1], Number(words[2]));
            } else if (words[0]=="drive"){
                this.moto.drive(Number(words[1]));
            } else if (words[0]=="remove"){
                this.moto.removePerson();
            } else if (words[0]=="init"&&words[1]=="kid"){
                this.create_kid();
            } else if (words[0]=="init"&&words[1]=="moto"){
                this.create_motorcycle();
            }else{
                console.log("Comando inválido.")
            }
        }
    }
}

let io = new IO();
io.shell();