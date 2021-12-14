const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

let logger: Array<Cliente> = [];

class Cliente{
    
    constructor(private id: string, private fone: string){
        this.id=id;
        this.fone=fone;
        logger.push(this);
    }
    
    public toString = (): string => this.id.toString();

    public getFone = (): string => this.fone;
    
    public getId = () => this.id;
    
    public setFone(fone: string){
        this.fone = fone;
    }

}

class Sala {
    cadeiras: Map<number, Cliente>;
    ids: Map<string, number>;

    constructor(public lotacao: number){
        this.cadeiras = new Map<number, Cliente>();
        this.ids = new Map<string, number>();
    }

    procurarChave(id: string): number {
        for (let [chave, pessoa] of this.cadeiras) {
            if (pessoa.getId() == id) {
                return chave;
            }
        }
        return -1;
    }

    public reservar(posicao: number, pessoa: Cliente){
        if (this.cadeiras.has(posicao)){
            console.log("Posição ocupada.");
            return;
        }
        if(this.ids.has(pessoa.getId())){
            console.log("A pessoa já está no cinema.");
            return;
        }
        this.cadeiras.set(posicao, pessoa);
        this.ids.set(pessoa.getId(), posicao);
    }
    public cancelar(id: string){
        if(!this.ids.has(id)){
            console.log("Pessoa não encontrada.");
            return;
        }
        let chave = this.ids.get(id);
        this.ids.delete(id);
        this.cadeiras.delete(chave);
    }

    public toString() {
        let saida = "";
        for (let i = 0; i < this.lotacao; i++) {
            if (this.cadeiras.has(i)) {
                let pessoa = this.cadeiras.get(i);
                saida += pessoa.getId() + " ";
            } else {
                saida += "- ";
            }
        }
        return saida;
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
            if(logger[i].getId()==id){
                conseguido=logger[i];
            }
        }
        if (conseguido==null){
            console.log("Cliente não encontrado.");
            return false;
        }
        else{
            this.sala.reservar(cadeira, conseguido);
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