class Agenda {
    contacts: Array<Contact>;

    constructor(contacts=[]){
        this.contacts=contacts;
    }

    findPosByName(name: string): number{
        let test = this.contacts.findIndex(elemento => elemento.getName()==name);
        return test;
    }

    addContact(contact: Contact){
        let procura: number = this.findPosByName(contact.getName());

        if(procura!=-1){
            this.contacts[procura].setFones(contact.getFones());
        }
        else{
            this.contacts.push(contact);
        }
    }

    findContact(name: string): string{
        let testar = this.contacts.find(elemento => elemento.getName()==name);
        let stringas=testar.toString();
        return stringas;
    }

    rmContact(name: string):boolean{
        for(let i=0;i<this.contacts.length;i++){
            if(this.contacts[i].getName()==name){
                this.contacts.splice(i, 1);
                console.log("Contato apagado!");
                return true;
            }
        }
        console.log("Achamo não, ó.")
        return false;
    }

    search(pattern: string): Array<string>{
        let arrei: Array<string> = [];

        for (let i=0; i<this.contacts.length; i++){
            if(this.contacts[i].toString().includes(pattern)){
                arrei.push(this.contacts[i].toString());      
            }
        }
        return arrei;
    }

    toString(): string{
        let str: string="";
        for (let i=0;i<this.contacts.length;i++){
            str += this.contacts[i].toString();
            str+="\n";
        }
        return str;
    }

    getContacts = (): Array<Contact> => this.contacts;

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

class Contact {
    protected prefix: string = "-";
    private fones: Array<Fone>;

    constructor(private name: string | null, fones: Array<Fone>){
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
        this.name=name;
        console.log("Nome alterado.");
        return this.name;
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

console.log(agenda.toString());

console.log(agenda.findPosByName("Sena"));
console.log(agenda.findContact("Nathan"));
console.log(agenda.search("Viv"));