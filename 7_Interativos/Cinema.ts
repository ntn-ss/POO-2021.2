const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

let logger: Array<Cliente> = [];

class Cliente{
    id: string;
    fone: string;
    
    constructor(id: string, fone: string){
        this.id=id;
        this.fone=fone;
        logger.push(this);
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

class IO {
    sala: Sala;

    create_sala(): Sala {
        write("Digite o número de cadeiras da sala: ");
        let chairs = input();
        let cadeiras = Number(chairs);
       
        this.sala = new Sala(cadeiras);
        return this.sala;
    }

    create_cliente(): Cliente {
        write("Digite o ID do Cliente: ");
        let id = input();

        write("Digite o telefone do cliente. ");
        let fone = input();
        
        let cliente = new Cliente(id, fone);
        return cliente;
    }

    mandarCliente(id, cadeira): boolean{
        let conseguido: Cliente | null = null;
        for (let i=0;i<logger.length;i++){
            if(logger[i].id==id){
                conseguido=logger[i];
            }
        }
        if (conseguido==null){
            console.log("Cliente não encontrado.");
            return false;
        }
        else{
            this.sala.reservar(conseguido, cadeira);
            return true;
        }
    }

    show_help(){
        write ("Comandos:\n");
        write (" init cli: cria um novo cliente.\n");
        write (" init sala: cria uma nova sala com um número X de cadeiras.\n");
        write (" show: mostra todo o estado da sala.\n");
        write (" reserve <id> <cadeira>: aloca um cliente numa cadeira.\n");
        write (" cancel: retira alguém de uma cadeira.\n");
    }

    shell(){
        this.create_sala();
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
                write("" + this.sala + "\n");
            } else if (words[0]=="reserve"){
                let id = words[1];
                let cadeira = words[2];
                this.mandarCliente(id, cadeira);
            } else if (words[0]=="init"&&words[1]=="sala"){
                this.create_sala();
            } else if (words[0]=="init"&&words[1]=="cli"){
                this.create_cliente();
            } else if (words[0]=="cancel"){
                write ("Digite o ID. ");
                let id=input();
                this.sala.cancelar(id);
            }else{
                console.log("Comando inválido.")
            }
        }
    }
}

let io = new IO();
io.shell();