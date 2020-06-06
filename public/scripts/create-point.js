

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => res.json() )
    .then( states => {
        for (let state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state]");

    console.log(event.target.value)
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then((res) => res.json())
        .then(cities => {
            
            for (let city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



//Items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for ( let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem items selecionados
    //se sim pegar os itens selecionados

    const alreadySlected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    } )

    //se ja estiver slecionado, tirar seleçao
    if (alreadySlected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado
        //adicionar à sekeção

        selectedItems.push(itemId)
    }
    console.log(selectedItems)

    //atualizar campo escondido
    collectedItems.value = selectedItems
}



