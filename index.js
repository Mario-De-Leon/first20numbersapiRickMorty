const url = "https://rickandmortyapi.com/api/character/"
let nombres = document.getElementById("nombres")
let boton1 = document.getElementById("boton1")

async function todosProductos(){
    // hace una peticion al servidor
    const response = await fetch(`${url}`)
    const data = await response.json()
    
    renderHTML(data.results)
    

} 
todosProductos();

let contador = 1;
async function siguientes(){
    let sig = await fetch(`${url}?page=${contador}`)
    let amonos = await sig.json()
    if(contador == 1 || contador < amonos.info.pages ){
    contador++
    nombres.innerHTML = ""
    let sig = await fetch(`${url}?page=${contador}`)
    let amonos = await sig.json()
    renderHTML(amonos.results)

    }else if(contador == amonos.info.pages){
        alert("Esto lo ago pa Divertirme")
    }
}

async function restrocer(){
    let sig = await fetch(`${url}?page=${contador}`)
    let amonos = await sig.json()
    if(contador > 1 ){
    contador--
    nombres.innerHTML = ""
    let sig = await fetch(`${url}?page=${contador}`)
    let amonos = await sig.json()
    renderHTML(amonos.results)

    }else if(contador == amonos.info.pages){
        alert("Esto lo ago pa Divertirme")
    }
}


function renderHTML(POrdenados){
    let contador =0; 
    let acumulador = 0;
    let columnas = "";
    POrdenados.forEach((p) => {
        contador++;
        acumulador++;
        if(p.image != undefined){
            columnas += `
            <div class="col-md-3 "> 
            <div class="card border border-dark mb-3" style="max-width: 18rem; min-height:350px">
                <div class="card-header border-dark two-row text-black text-center">${p.name}
                </div>
                <div class="card-body text-success">
                    <img class="card-img-top" src="${p.image}" alt="">
                </div>
                <p class="card-text">ID Personaje: ${p.id}</p>
                <p class="card-text">${p.species}</p>
                <a href="#" class="btn btn-primary disabled" >${p.gender}</a>
            </div>
            </div>
                `
        }
        if(contador == 4 || acumulador == POrdenados.length){
            var fila = document.createElement('div')
            fila.classList.add('row')
            fila.innerHTML = columnas
            nombres.appendChild(fila)
            contador=0;
            columnas = ""
            
        }
    })
}
