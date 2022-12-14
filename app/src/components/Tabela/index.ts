export function linhaTabela (td : Array<any>) : HTMLTableRowElement{
   const tr = document.createElement('tr');
   td.forEach((value, i) => tr.append(value as HTMLTableColElement));
   return tr;
}

export function colunaTabela(conteudo : any) : any {
   const td = document.createElement('td');

   if(conteudo instanceof HTMLElement){
      td.append(conteudo);
   }
   else{
      td.innerHTML = conteudo;

   }

   return td;
}
