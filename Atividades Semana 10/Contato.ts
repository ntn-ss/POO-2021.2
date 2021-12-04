class Fone{
    private id: string;
    private number: string;

    constructor(id: string, number: string){
        this.id=id;
        this.number=number;
    }

    public validate(): boolean{
        if (this.number.match(/^[+()-.0-9]*$/)) {
            console.log("Validado.");
            return true;
        }
        else{
            console.log("Invalidado.");
            return false;
        }
    }

    public static isValid(number): boolean{
        if (number.match(/^[+()-.0-9]*$/)) {
            return true;
        }
        else{
            return false;
        }
    }

    public toString(): string{
        let str=`${this.id} : ${this.number}`;
        return str;
    }

    public getId = ():string => this.id;
    
    public getNumber = ():string => this.number;

    public setId(id: string): string{
        this.id=id;
        return this.id;
    }

    setNumber(number:string): string | void{
        if(Fone.isValid(number)){
            console.log("Número alterado.");
            this.number=number;
            return this.number;
        }
        else{
            console.log("Número inválido.");
        }
    }
}

let log: Array<String> = [];
class Contact {
    protected prefix: string = "-";
    private fones: Array<Fone>;

    constructor(private name: string | null, fones: Array<Fone>){
        if(name==null){
            this.name="";
            log.push(this.name);
            this.fones=fones;
        }

        else if (!this.nomeExiste(name)){
            this.name=name;
            log.push(this.name);
            this.fones=fones;
        }

        else{
            console.log("Nome já existente, criação negada.");
        }
    }

    public addFone(fone: Fone): boolean{
        if(fone.validate()){
            this.fones.push(fone);
            console.log("Fone adicionado!");
            return true;
        }
    }

    public rmFone(index: number): boolean{
        if(index<0 || index>this.fones.length){
            console.log("Índice inalcançável.");
            return false;
        }
        else{
            for(let i=0; i<this.fones.length; i++){
                if (i==index){
                    this.fones.splice(index, 1);
                    console.log("Fone apagado.");
                    return true;
                }
            }
        }
        console.log("Fone não encontrado.");
        return false;
    }
    
    public getName = ():string => this.name;

    
    public setName(name): string | boolean{
        if (this.nomeExiste(name)){
            console.log("Nome alterado.");
            this.name=name;
            return this.name;
        }

        else{
            console.log("Nome já existente.");
            return false;
        }
    }
    
    private nomeExiste(nome): boolean{
        for (let i=0;i<log.length;i++){
            if (log[i]==nome){
                return true;
            }
        }
        return false;
    }
    
    public getFones = ():Array<Fone> => this.fones;

    public setFones(fones: Array<Fone>): Array<Fone>{
        this.fones=[];
        for(let i=0;i<fones.length;i++){
            this.addFone(fones[i]);
            return this.fones;
        }
    }

    public toString(): string{
        let str=`${this.prefix} ${this.name} `;
        for (let i=0;i<this.fones.length;i++){
            str+=`[ ${i}: ${this.fones[i]} ] `;
        }
        return str;
    }
}

let test = new Fone ("oi", "+55(85)9.9123-2105");
let sena = new Contact ("Sena", [test]);

let test2 = new Fone ("casa", "+55(85)9.4655-0298")
sena.addFone(test2);
console.log(sena.toString());

let subTeste = new Fone("falso", "123abc");
sena.addFone(subTeste);

sena.rmFone(1);
console.log(sena.toString());

let test3 = new Fone ("Tim", "+55(85)9.9973-9420");
let senaFake = new Contact ("Sena", [test3]);