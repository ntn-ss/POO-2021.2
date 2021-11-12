class PulaPula {
    brincando: Array<Crianca | null>;
    numero_max: number;
    esperando: Array<Crianca | null>;
    idade_max: number;

    constructor(brincando: Array<Crianca | null>, esperando: Array<Crianca|null>, numero_max: number, idade_max:number){
        this.brincando=brincando;
        this.esperando=esperando;
        this.numero_max=numero_max;

        for (let i=0;i<this.numero_max;i++){
            this.brincando.push(null);
            this.esperando.push(null);
        }
        this.idade_max = idade_max;
    }

    private verificaIdade(crianca: Crianca): boolean{
        if(crianca.idade>=this.idade_max){
            console.log("Idade alta demais para o brinquedo.")
            return false;
        }
        else{
            return true;
        }
    }

    private verificaCapacidadeDentro(): boolean{
        let x=0;
        for(let i=0;i<this.numero_max;i++){
            if (this.brincando[i]!=null){
                x++;
            }
        }
        if(x>this.numero_max){
            console.log("Criança demais brincando.");
            return false;
        }
        else{
            return true;
        }
    }

    private verificaCapacidadeFora():boolean{
        let x2=0;
        for(let i=0;i<this.numero_max;i++){
            if (this.esperando[i]!=null){
                x2++;
            }
        }
        if(x2>this.numero_max){
            console.log("Criança demais na fila.");
            return false;
        }
        else{
            return true;
        }
    }

    chegarCrianca(crianca: Crianca): boolean{
        if (this.verificaIdade(crianca)){
            if(this.verificaCapacidadeFora()){
                let x=0;
                for(let i=0;i<this.numero_max;i++){
                    if (this.esperando[i]!=null){
                        x++;
                    }
                }
                this.esperando[x]=crianca;
                return true;
            }
        }
        return false;
    }

    entra(){
        if(this.verificaCapacidadeDentro()){
            for(let x=0;x<this.brincando.length;x++){
                if(this.brincando[x]==null){
                    this.brincando[x]=this.esperando[0];
                    this.esperando.shift();
                    this.esperando.push(null);
                    return true;
                }
            }
        }
        return false;
    }

    sai(): boolean{
        if(this.brincando[0] != null){
            for (let conta=0; conta<=this.numero_max; conta++){
                if(this.esperando[conta]==null){
                    this.esperando[conta]=this.brincando[0];
                    this.brincando.shift();
                    this.brincando.push(null);
                    return true;
                }
            }
        return false;
        }
    return false;
    }

    remove(crianca: Crianca){
        for (let i=0;i<this.brincando.length;i++){
            if(this.brincando[i] == crianca){
                this.brincando[i]=null;
                console.log("Criança deletada.");
            }
            else if(this.esperando[i]==crianca){
                this.esperando[i]=null;
                console.log(`Nós, da INTELIGÊNCIA, deletamos ${crianca}`);
            }
        }
    }

    toString():string {
            let str="Esperando: ";
            for (let i=0; i<this.esperando.length; i++){
                let vaga=this.esperando[i]; 
                str+=i+": "
                if(vaga==null){
                    str+="-"
                }else{
                    str+=vaga.toString();
                }
                str += " |";
            }
            str += "\nBrincando: ";
            for (let i=0; i<this.brincando.length; i++){
                let vaga2=this.brincando[i]; 
                str+=i+": "
                if(vaga2==null){
                    str+="-"
                }else{
                    str+=vaga2.toString();
                }
                str += " |";
            }
            return str;
        }
}

class Crianca {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome=nome;
        this.idade=idade;
    }

    getNome(): string{
        return this.nome;
    }

    setNome(nome: string): boolean{
        if (this.nome==nome){
            console.log("Esse já é o nome da criança.");
            return false;
        }else{
            this.nome=nome;
            console.log("Nome trocado.");
            return true;
        }
    }
    getIdade(): number{
        return this.idade;
    }

    setIdade(idade: number){
        if (this.idade==idade){
            console.log("Essa já é a idade da criança.");
            return false;

        }else if(idade>=pula.idade_max){
            console.log("Idade alta demais para o brinquedo.")
            return false;
        }
        else{
            this.idade=idade;
            console.log("Idade trocada.");
            return true;
        }
    }

    toString(): string{
        return `Nome: ${this.nome}. Idade: ${this.idade}.`
    }
}

let pula = new PulaPula([null], [null], 3, 10);

let carlinhos = new Crianca("Carlinhos", 5);
pula.chegarCrianca(carlinhos);
pula.entra();
pula.sai();
console.log(pula.toString());

let enzo = new Crianca ("Enzo", 9);
pula.chegarCrianca(enzo);
console.log(pula.toString());

let valentina = new Crianca ("Valentina", 4);
pula.chegarCrianca(valentina);
console.log(pula.toString());

let yuri = new Crianca ("Yuri", 8);
pula.chegarCrianca(yuri);
console.log(pula.toString());

pula.entra();
console.log(pula.toString());

pula.entra();
console.log(pula.toString());

pula.entra();
console.log(pula.toString());

pula.entra();
console.log(pula.toString());

pula.sai();
console.log(pula.toString());

pula.sai();
console.log(pula.toString());

pula.sai();
console.log(pula.toString());

pula.sai();
console.log(pula.toString());

pula.remove(yuri);
console.log(pula.toString());