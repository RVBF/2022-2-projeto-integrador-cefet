export function Link(id: string, url: string, name: string, containerClass: string) : HTMLAnchorElement {
   const link = document.createElement('a');
 
   link.innerHTML = name;
   link.href = url;
   link.setAttribute('class', containerClass);
   link.setAttribute('id', id);
  
   return link;
 }