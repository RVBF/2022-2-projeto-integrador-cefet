export function formataData(data: String){
    let resultado = data.split(' ');
    let dataArray = resultado[0].split('-');

    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]} ${resultado[1]}`;
}