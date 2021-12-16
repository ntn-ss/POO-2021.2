abstract class ConceitoFilme {

    public constructor(private genero: string, private lancado: boolean = false){
        this.genero = genero;
        this.lancado = lancado;
    }

    public foiLancado = (): boolean => this.lancado;

    public pegaGenero = ():string => this.genero;

    protected setLancado (buleano: boolean): boolean{
        if (buleano!=false){
            this.lancado = buleano;
            return this.lancado;
        }
        else{
            console.log("Não se deslança algo.")
            return false;
        }
    }

    public toString():string{
        let str: string = `Gênero: "${this.genero}". ` + (this.lancado ? '"Lançado".' : '"Em Produção".');
        return str;
    }

    abstract lancar(): void;
}

class Lancamento extends ConceitoFilme {

    constructor(private titulo: string, genero: string){
        super(genero);
        this.titulo=titulo;
    }
    
    public getTitulo = ():string => this.titulo;

    public lancar(): boolean {
        if (!this.foiLancado()){
            console.log(`Novo lançamento: "${this.titulo}"! Hoje, nos cinemas.`);
            this.setLancado(true);
            return true;
        }
        else{
            console.log("Filme já lançado.");
            return false;
        }
    }

    public toString(): string {
        let str = `Nome: "${this.titulo}". ` + super.toString();
        return str;
    }
}

function main(){
    let missaoImpossivel = new Lancamento("Missão Impossível", "Ação");
    console.log(missaoImpossivel.getTitulo());
    console.log(missaoImpossivel.foiLancado());
    console.log(missaoImpossivel.pegaGenero());
    console.log(missaoImpossivel.toString());
    missaoImpossivel.lancar();
    missaoImpossivel.lancar();
    console.log(missaoImpossivel.foiLancado());
}

main();