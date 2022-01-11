class Paciente {

    private nome: string;
    private diagnostico: string;
    private medicos: Map <string, Medico>;

    constructor(nome: string, diagnostico: string){

        this.nome = nome;
        this.diagnostico = diagnostico;
        this.medicos = new Map <string, Medico>();

    }

    public addMedico(medico: Medico){
        let nome = medico.getNome(), especialidade = medico.getEspecialidade();

        for (let value of this.medicos.values()){

            if (value.getEspecialidade()==especialidade && value.getNome()!=nome){
                console.log(`Já tem ${especialidade}!`);
                medico.rmPaciente(this.nome);
                return;
            }

        }
        
        this.medicos.set(nome, medico);
        medico.addPaciente(this);
    }

    public rmMedico(nome: string){
            
        if (!this.medicos.has(nome)){
            return;
        }

        else{
            let medico: undefined | Medico = this.medicos.get(nome);
            if (medico !== undefined){
                this.medicos.delete(nome);
                medico.rmPaciente(this.nome);
            }
        }
    }

    public getNome = (): string => this.nome;
    public getDiagnostico = (): string => this.diagnostico;
    public getMedicos = (): Array<string> => [...this.medicos.keys()];
    
    public toString(): string{
        return `Nome: ${this.nome}. Doença: ${this.getDiagnostico()}. Médicos: ${this.getMedicos().join(", ")}.`;
    }
}

class Medico {

    private nome: string;
    private especialidade: string;
    private pacientes: Map<string, Paciente>;

    constructor(nome: string, especialidade: string){
        this.nome = nome;
        this.especialidade = especialidade;
        this.pacientes = new Map <string, Paciente>();
    }
    
    public addPaciente(paciente: Paciente){
        let nome = paciente.getNome();
        if (this.pacientes.has(nome)){
            paciente.rmMedico(this.nome);
			return;
        }
        this.pacientes.set(nome, paciente);
        paciente.addMedico(this);
    }

    public rmPaciente(nome: string){
        if (!this.pacientes.has(nome)){
            return;
        }

        else{
            let paciente: undefined | Paciente = this.pacientes.get(nome);
            if (paciente !== undefined){
                this.pacientes.delete(nome);
                paciente.rmMedico(this.nome);
            }
        }
    }

    public getNome = (): string => this.nome;
    public getEspecialidade = (): string => this.especialidade;
    public getPacientes = (): Array<string> => [...this.pacientes.keys()];

    public toString(): string{
        return `Nome: ${this.nome}. Especialidade: ${this.getEspecialidade()}. Pacientes: ${this.getPacientes().join(", ")}.`;
    }
}

function main(){
    let senapk = new Paciente ("Sena", "Osso Quebrado");
    let kakaroto = new Medico ("Goku", "Cirurgião");
    let mtyson = new Medico ("Mike Tyson", "Ortopedista");
    let vegeta = new Medico ("Vegeta", "Cirurgião");

    senapk.addMedico(kakaroto);
    senapk.addMedico(mtyson);
    senapk.addMedico(vegeta);

    console.log(senapk.toString());
    console.log(kakaroto.toString());
    console.log(mtyson.toString());
    console.log(vegeta.toString());

    kakaroto.rmPaciente(senapk.getNome());
    mtyson.rmPaciente(senapk.getNome());

    console.log(senapk.toString());
    console.log(kakaroto.toString());
    console.log(mtyson.toString());
}

main();