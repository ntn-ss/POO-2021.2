class Grafite {
    calibre: number;
    dureza: string;
    tamanho: number;
    constructor(calibre: number, dureza: string, tamanho: number) {
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString(): string {
        //return "Grafite: " + this.calibre + ":" + this.dureza + ":" + this.tamanho;
        return `Grafite ${this.calibre}:${this.dureza}:${this.tamanho}`;
    }
}

//agregação
class Lapiseira {
    calibre: number;
    grafites: Array<Grafite>;
    maximo: number;

    constructor(calibre: number, maximo: number) {
        this.calibre = calibre;
        this.grafites = new Array<Grafite>();
        this.maximo = 5;
    }

    setGrafite(grafite: Grafite): boolean {
        if (this.grafites.length >= this.maximo){
            console.log("Lapiseira cheia.");
            return false;
        }

        if (grafite.calibre != this.calibre) {
            console.log("O grafite não é compatível com a lapiseira.");
            return false;
        }
        this.grafites.push (grafite);
        return true;
    }

    removerGrafite(): Grafite | null {
        if (this.grafites.length == 0) {
            console.log("A lapiseira não possui um grafite");
            return null;
        }
        let grafite = this.grafites.shift();
        if (grafite === undefined){
            return null;
        }
        return grafite;
    }

    escrever(folhas: number): boolean | void {
        //verificar se existe grafite
        if (this.grafites.length == 0) {
            console.log("A lapiseira não possui um grafite");
            return false;
        }
        let gasto = this.grafites[0].gastoPorFolha() * folhas;

        if (gasto <= this.grafites[0].tamanho) {
            console.log("Escrita concluída.");
            this.grafites[0].tamanho -= gasto;
            if (this.grafites[0].tamanho == 0){
                this.removerGrafite();
                console.log("Tiramos o grafite acabado.")
                return true;
            }
            return true;
        } else if (this.grafites[0].tamanho != 0){
            let realizado = this.grafites[0].tamanho / this.grafites[0].gastoPorFolha();
            console.log("Escrita parcial: " + realizado + " folhas");
            this.grafites[0].tamanho = 0;
            if (this.grafites[0].tamanho == 0){
                this.removerGrafite();
                console.log("Tiramos o grafite acabado.")
                return true;
            }
            return true;
        }
    }
}

let pentel = new Lapiseira(0.5, 5);
pentel.setGrafite(new Grafite(0.5, "HB", 40));
pentel.setGrafite(new Grafite(0.5, "HB", 50));
pentel.setGrafite(new Grafite(0.5, "HB", 60));
pentel.setGrafite(new Grafite(0.5, "HB", 70));
pentel.setGrafite(new Grafite(0.5, "HB", 80));
pentel.setGrafite(new Grafite(0.5, "HB", 90));
pentel.escrever(40);
pentel.escrever(10);
pentel.escrever(50);
pentel.escrever(60);
pentel.escrever(70);
pentel.escrever(80);
console.log(pentel);