function depositar(conta:any, valor:number):void{
    conta.saldo+=valor;
}

function sacar(conta:any,valor:number):boolean{
    if(valor<=conta.saldo){
        conta.saldo-=valor;
        return true;
    }else{
        console.log("Saldo insuficiente");
        return false;
    }
}

function criar_conta(nome_titular:any,saldo_inicial:number):any{
    return{
        "nome_titular": nome_titular,
        "saldo": saldo_inicial
    }
}

let conta=criar_conta("Victor",0);
let conta1=criar_conta("Maria",1000);

depositar(conta, 10);
console.log(conta.saldo);

sacar(conta,9);
console.log(conta.saldo);
sacar(conta,9);
console.log(conta.saldo);

sacar(conta1, 500);
console.log(conta1.saldo);