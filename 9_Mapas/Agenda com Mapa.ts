class Agenda {
    contacts: Map<string, Contact>;

    constructor(){
        this.contacts = new Map <string, Contact>();
    }

    addContact(contact: Contact){

        if(this.contacts.has(contact.getName())){
            let existente = this.contacts.get(contact.getName());
            for (let fone of contact.getFones()){
                existente.addFone(fone);
            }
        }
        else{
            this.contacts.set(contact.getName(), contact);
        }
    }

    findContact(name: string): string{
        if (this.contacts.has(name)){
            let stringas=this.contacts.get(name).toString();
            return stringas;
        }
    }

    rmContact(name: string):boolean{
        if (this.contacts.has(name)){
            this.contacts.delete(name);
            return true;
        }
        else{
            console.log("Achamo não, ó.")
            return false;
        }
    }

    search(pattern: string): Array<string>{
        let arrei: Array<string> = [];

            for (let contact of this.contacts.values()){
                if(contact.toString().includes(pattern)){
                    arrei.push(contact.toString());
                }
            }
        return arrei;
    }

    toString(): string{
        let str: string="";
        for (let contact of this.contacts.values()){
            str += contact.toString();
            str+="\n";
        }
        return str;
    }

    getContacts = (): Map<string, Contact> => this.contacts;

}

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

    public static isValid(number: string): boolean{
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

class Contact {
    protected prefix: string = "-";
    private fones: Array<Fone>;
    private name: string;

    constructor(name: string|null, fones: Array<Fone>){
        if(name==null){
            this.name="";
            this.fones=fones;
        }

        else {
            this.name=name;
            this.fones=fones;
        }
    }

    public addFone(fone: Fone): boolean{
        if(fone.validate()){
            this.fones.push(fone);
            console.log("Fone adicionado!");
            return true;
        }
        return false;
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

    
    public setName(name: string): string | boolean{
        this.name=name;
        console.log("Nome alterado.");
        return this.name;
    }
    
    public getFones = ():Array<Fone> => this.fones;

    public setFones(fones: Array<Fone>): Array<Fone>|void{
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

let test = new Fone ("Oi", "+55(85)9.9123-2105");
let sena = new Contact ("Sena", [test]);

let test2 = new Fone ("Casa", "+55(85)9.4655-0298")
sena.addFone(test2);
console.log(sena.toString());

let subTeste = new Fone("Falso", "123abc");
sena.addFone(subTeste);

sena.rmFone(1);
console.log(sena.toString());

let test3 = new Fone ("Vivo", "+55(85)9.3852-0349");
let senaFake=new Contact("Sena", [test3]);

let agenda = new Agenda();

agenda.addContact(sena);
agenda.addContact(senaFake);

let numeroNathan=new Fone("Claro", "+55(85)9.9141-9385");
let nathan = new Contact("Nathan", [numeroNathan]);
agenda.addContact(nathan);

agenda.toString();

console.log(agenda.toString());

console.log(agenda.findContact("Nathan"));
console.log(agenda.search("ena"));