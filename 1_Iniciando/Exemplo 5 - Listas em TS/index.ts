/*JavaScript
let l=[1,2,3];
console.log(l);


//TypeScript
let l1:number[]=[2,3,4];
console.log(l1);

let l2:string[]=["Teste","Porra","Nathan é Foda"];
l2[0]="Victor";
console.log(l2);

//Iteração - JavaScript
console.log(l1.length);
for(let i=0;i<l1.length;i++){
    console.log(i,l1[i]);
}

//for... in
for (let i in l1){
    console.log(i, l1[i]);
}

//for... of = para quando se precisa apenas dos valores de l1
for (let elemento of l1){
    console.log(elemento);   
}

//Tipagem
console.log(l1.length);
for(let i:number=0;i<l1.length;i++){
    console.log(i,l1[i]);
}
*/

//Operações sobre lista
let lista:number[]=[10,20,30,40];
//Inserir elementos
lista.push(50);
console.log(lista);
//Remover elementos
lista.splice(2,1);
console.log(lista);