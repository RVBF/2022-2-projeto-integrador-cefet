export function linhaTabela (td : Array<HTMLTableCellElement>) : HTMLTableRowElement{
   const tr = document.createElement('tr');
   td.forEach((value, i) => tr.append(value));
   return tr;
}

export function colunaTabela(texto : any) : HTMLTableCellElement {
   const td = document.createElement('td');

   td.innerText = texto;

   return td;
}
