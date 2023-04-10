const enterprise = document.getElementById('enterprise')
const enterpriseUpdate = document.getElementById('enterpriseUpdate')


const enterpriseOptions = async () => {
    try {
        const enterprises = await fetch('/api/admin/enterprise')
        const data = await enterprises.json()

        let acumulador = `<option disabled selected value=''>Select a company</option>`

        data.enterprises.forEach(el => {
            acumulador += `<option value='${el.name}'>${el.name}</option>`
        });
        enterpriseUpdate.innerHTML = acumulador
        enterprise.innerHTML = acumulador
    } catch (error) {
        console.log(error);
    }
}

enterpriseOptions()

// ----------------Update----------------

// Fill form fields with fetch 

const updateBtn = document.querySelectorAll('.fa-pen')


const ownerUpdate = document.getElementById('ownerUpdate')
const nameUpdate = document.getElementById('nameUpdate')
const emailUpdate = document.getElementById('emailUpdate')
const imoNumberUpdate = document.getElementById('imoNumberUpdate')
const mmsiUpdate = document.getElementById('mmsiUpdate')
const callSignUpdate = document.getElementById('callSignUpdate')
const flagUpdate = document.getElementById('flagUpdate')
const portRegUpdate = document.getElementById('portRegUpdate')
const compassUpdate = document.getElementById('compassUpdate')
const markUpdate = document.getElementById('markUpdate')
const serialNumberUpdate = document.getElementById('serialNumberUpdate')
const statusUpdate = document.getElementById('statusUpdate')

let id

updateBtn.forEach(btn => {
    btn.addEventListener('click', async e => {
        id = e.target.getAttribute('data-id')
        try {
            const data = await fetch(`/api/admin/contact/${id}`)
            const contact = await data.json()

            enterpriseUpdate.value = contact.enterprise || ''
            ownerUpdate.value = contact.owner || ''
            nameUpdate.value = contact.name || ''
            emailUpdate.value = contact.email || ''
            imoNumberUpdate.value = contact.imoNumber || ''
            mmsiUpdate.value = contact.mmsi || ''
            callSignUpdate.value = contact.callSign || ''
            flagUpdate.value = contact.flag || ''
            portRegUpdate.value = contact.portReg || ''
            compassUpdate.value = contact.compass || ''
            markUpdate.value = contact.mark || ''
            serialNumberUpdate.value = contact.serialNumber || ''
            statusUpdate.value = contact.status || ''

        } catch (error) {
            console.log(error);
        }
    })
})

const submit = document.querySelector('#updateBtn')

submit.addEventListener('click', async () => {

    console.log(id);

    const data = {
        id,
        enterprise: enterpriseUpdate.value,
        name:  nameUpdate.value,
        owner: ownerUpdate.value,
        email: emailUpdate.value,
        imoNumber:imoNumberUpdate.value,
        mmsi:mmsiUpdate.value,
        callSign:callSignUpdate.value,
        flag:flagUpdate.value,
        portReg:portRegUpdate.value,
        compass:compassUpdate.value,
        mark:markUpdate.value,
        serialNumber:serialNumberUpdate.value,
        status:statusUpdate.value,
    }

    const requestURI = `/api/admin/contact/${id}`
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(data)
    }

    await fetch(requestURI, requestOptions)
        .then(() => {
            location.reload()
        })
})


//History

const historyBtn = document.querySelectorAll('.fa-clipboard')
const historyForm = document.querySelector('#historyForm')
const historyUl = document.querySelector('#historyModal ul')

historyBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        id = e.target.getAttribute('data-id')
        historyForm.action = `api/admin/contact/${id}/history`
    })
})

historyBtn.forEach(btn => {
    btn.addEventListener('click', async e => {
        id = e.target.getAttribute('data-id')

        const history = await fetch(`api/admin/contact/${id}/history`)
        const data = await history.json()

        let historyLog = ''

        data.forEach(h => {
        
            historyLog += `
            <p>${h.date}</p>
            <li>${h.message}</li>
            `
        })

        historyUl.innerHTML = historyLog
    })
})


// Delete

const trashBtn = document.querySelectorAll('.fa-trash-can')

trashBtn.forEach(btn => {
    btn.addEventListener('click', async e => {

        id = e.target.getAttribute('data-id')
        const requestURI = `/api/admin/contact/${id}`
        const requestOptions = {
            method: 'DELETE',
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            fetch(requestURI, requestOptions)
                .then(() => {
                    location.reload()
                })
        }
        })
    })
})

