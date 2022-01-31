class Cliente{
    id: string;
    fone: string;
    
    constructor(id: string, fone: string){
        this.id=id;
        this.fone=fone;
    }
    toString(): string{
        return this.id;
    }

    getFone(): string{
        return this.fone;
    }
    
    setFone(fone: string){
        this.fone = fone;
    }

    getId(id: string){
        return this.id;
    }
}

class Sala{
    sentados:Array<Cliente | null>;
    capacidade: number;
    constructor(capacidade: number){
        this.sentados = [];
        for (let i = 0; i < capacidade; i++) {
            this.sentados.push(null);
        }
        this.capacidade = capacidade;
    }
    cancelar(id: string): boolean{
        for (let i = 0; i < this.sentados.length; i++) {
            if(this.sentados[i]!=null){
                if (this.sentados[i].id == id){
                    this.sentados[i]=null;
                    console.log("Cliente removido.");
                    return true;
                }
            }
        }
        console.log("Inseriu um id que não existe.");
        return false;
    }
    reservar(clientela: Cliente, ind: number): boolean {
        if (this.sentados[ind] != null){
            console.log("Tem gente.");
            return false;
        }
        
        if (ind >= this.sentados.length){
            console.log("Pode criar cadeira não.")
            return false;
        }
        
        for (let i=0; i<this.sentados.length;i++){
            if(this.sentados[i]!=null){
                if(this.sentados[i].id==clientela.id){
                    console.log("Pode o mesmo id não.")
                    return false;
                }
        }
    }
    this.sentados[ind]=clientela;
    return true;
}
    
    toString(): string{
        let str="Cadeiras: ";
        for (let i=0; i<this.sentados.length; i++){
            let cadeira=this.sentados[i]; 
            str+=i+": "
            if(cadeira==null){
                str+="-"
            }else{
                str+=cadeira.toString();
            }
            str += " |";
        }
        return str;
    }
}

let sala = new Sala(5);

let antonia = new Cliente ("0", "9.9176-8394");
sala.reservar(antonia, 0);
console.log(sala.toString());

let olegario = new Cliente ("10", "9.9435-0327");
sala.reservar(olegario, 1);
console.log(sala.toString());

let izolda = new Cliente ("20", "9.9864-6178");
sala.reservar(izolda, 2);
console.log(sala.toString());

let izildaExcluida = new Cliente ("20", "9.9568-4153");
sala.reservar(izildaExcluida, 3);

let sebastiao = new Cliente ("30","9.9125-6488");
sala.reservar(sebastiao, 3);
console.log(sala.toString());

let joao = new Cliente ("40", "9.9265-2345");
sala.reservar(joao, 4);
console.log(sala.toString());

let tentaCriarCadeira = new Cliente ("50", "9.9265-2345");
sala.reservar(tentaCriarCadeira, 5);

sala.cancelar("0");
console.log(sala.toString());

sala.cancelar("10");
console.log(sala.toString());

sala.cancelar("20");
console.log(sala.toString());

sala.cancelar("30");
console.log(sala.toString());

sala.cancelar("40");
console.log(sala.toString());

sala.cancelar("50"); //cliente inexistente