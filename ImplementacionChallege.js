function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return console.log("Archivo vacio");
    }
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      var cont =0;
      var regex1=/RQ[0-9][0-9](AV|RV)(0[0-9]|10)FN/;
      var regex2=/RT[0-9][0-9](00|99)FN/;
      var elemento = document.getElementById('respuesta-archivo');
      var comando=0;
      var respuesta=0;
      var id="";
      while(cont<contenido.length){
                if(lineaLog(contenido,cont,10,regex1) != null){
                    
                 elemento.innerHTML +="comando0"+comando+" "+lineaLog(contenido,cont,10,regex1)[0]+" ID:"+contenido.substring(cont+2,cont+4)+" Pasos:"+contenido.substring(cont+6,cont+8)+" Direccion:"+contenido.substring(cont+4,cont+6)+"\n";
                 cont+=10;
                 comando++;
                }
                else{
                   if(lineaLog(contenido,cont,8,regex2)!=null){
                    elemento.innerHTML +="respuesta0"+respuesta+" "+lineaLog(contenido,cont,8,regex2)[0] +"\n";
                    id=contenido.substring(cont+2,cont+4);
                    cont+=8;
                    respuesta++;
                        if(lineaLog(contenido,cont,10,regex1) == null && cont+10<contenido.length){
                            elemento.innerHTML +="ID Respuesta= "+id+"\n";
                        }
                    }
                    else{
                        cont=eliminarError(cont,contenido,elemento);
                    }
                }
       } 
       elemento=document.getElementById('bytes-archivo');
       elemento.innerHTML ="Cantidad de Bytes= "+respuesta*8+comando*10;
       mostrarContenido(contenido);
    };  
    lector.readAsText(archivo);
}
  
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

function eliminarError(cont,contenido,elemento){
    var errores="";
    while(contenido.substring(cont,cont+2) != "FN"){
        errores+=contenido.substring(cont,cont+2);
        cont+=2;
    }
    elemento.innerHTML +="ERROR "+ errores +"FN"+"\n";
    return cont+2;
} 

function lineaLog(contenido,cont,cant,regex){
    return contenido.substring(cont,cont+cant).match(regex);
}

document.getElementById('file-input').addEventListener('change', leerArchivo, false);