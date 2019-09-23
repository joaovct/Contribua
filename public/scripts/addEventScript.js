// Hide elements
var asides = document.getElementsByClassName('asides')
for(i=0;i<asides.length;i++){
    if(i>0) $(asides[i]).hide()
    // $(asides[0]).show()
}
$('.typeEvent').hide()
$('.article-event').hide()
$('.overlay').hide()
$('.preview').hide()
$('.done').hide()

// consts

const btns = document.getElementsByClassName('form-submit')

//Step 1
var casesChecked = []
const cases = document.getElementsByClassName('form-checkbox')
const cep = document.getElementsByName('eventCEP')[0]
const iconCep = cep.parentNode
const addressNumber = document.getElementsByName('eventAddressNumber')[0]
const iconAddressNumber = addressNumber.parentNode
const city = document.getElementsByName('eventCity')[0]
const iconCity = city.parentNode
const district = document.getElementsByName('eventDistrict')[0]
const iconDistrict = district.parentNode
const address = document.getElementsByName('eventAddress')[0]
const iconAddress = address.parentNode

// Step 2
const radio = document.getElementsByClassName('form-radio')
const pDStart = document.getElementsByName('eventPDStart')[0]
const pDEnd = document.getElementsByName('eventPDEnd')[0]
const pHStart = document.getElementsByName('eventPHStart')[0]
const pHEnd = document.getElementsByName('eventPHEnd')[0]
const rDStart = document.getElementsByName('eventRDStart')[0]
const rHStart = document.getElementsByName('eventRHStart')[0]
const rDEnd = document.getElementsByName('eventRDEnd')[0]
const rHDescription = document.getElementsByName('eventRHDescription')[0]
const rHDIcon = rHDescription.parentNode

// Step 3
var jobs = []
const jobName = document.getElementsByName('jobName')[0]
const nameIcon = jobName.parentNode
const jobDescription = document.getElementsByName('jobDescription')[0]
const descriptionIcon = jobDescription.parentNode
const jobAmount = document.getElementsByName('jobAmount')[0] 
const amountIcon = jobAmount.parentNode
// Edit
const nameEdit = document.getElementsByName('jobNameEdit')[0]
const nameIconEdit = nameEdit.parentNode
const descriptionEdit = document.getElementsByName('jobDescriptionEdit')[0]
const descriptionIconEdit = descriptionEdit.parentNode
const amountEdit = document.getElementsByName('jobAmountEdit')[0] 
const amountIconEdit = amountEdit.parentNode 

// Step 4
const eventTitle = document.getElementsByName('eventTitle')[0]
const eventContent = document.getElementsByName('eventContent')[0]

function checksStep1(){
    var vCauses = validationCauses(cases)
    var vCep = validationCep(cep, iconCep)
    var vAddressNumber = validationAddressNumber(addressNumber, iconAddressNumber)
    var vCity = validationCity(city, iconCity)
    var vDistrict = validationDistrict(district, iconDistrict)
    var vAddress = validationAddress(address, iconAddress)
    if(vCauses && vCep && vAddressNumber && vCity && vDistrict && vAddress){
        $('.aside-1').slideUp('fast')
        $('.aside-2').slideDown('slow')
        return true
    }else return false
}

function checksStep2(){
    var optionChoose = getOptionChoose(radio)
    if(optionChoose != false){
        if(optionChoose.value == "punctual") return checksTypeEventPunctual()
        else return checksTypeEventRecurrent()
    }else return false
}

function checksTypeEventPunctual(){
    var vDate = validationPunctualDate(pDStart, pHStart, pDEnd, pHEnd)
    if(vDate){
        $('.aside-2').slideUp('fast')
        $('.aside-3').slideDown('slow')
        return true
    }else return false
}

function checksTypeEventRecurrent(){
    var vDate = validationRecurrentDate(rDStart, rHStart, rDEnd)
    var vDescription = true
    if(rHDescription.length <= 10){
        iconError(rHDIcon)
        vDescription = false
    }
    if(vDate && vDescription){
        $('.aside-2').slideUp('fast')
        $('.aside-3').slideDown('slow')
        return true
    }else return false
}

function checksJob(){
    var vName = true, vDescription = true, vAmount = true
    if(jobName.value.length < 5){
        iconError(nameIcon)
        vName = false
    }else iconSuccess(nameIcon)
    
    for(let job of jobs){
        if(jobName.value == job.name){
            iconError(nameIcon)
            vName = false
        }
    }

    if(jobDescription.value.length < 10){
        iconError(descriptionIcon)
        vDescription = false
    }else iconSuccess(descriptionIcon)
    if(jobAmount.value < 1){
        iconError(amountIcon)
        vAmount = false
    }else iconSuccess(amountIcon)

    if(vName && vDescription && vAmount){
        writeJobs(jobName.value, jobDescription.value, jobAmount.value)
        $('.modal-job').slideUp('fast')
        jobName.value = ""
        iconClear(nameIcon)
        jobDescription.value = ""
        iconClear(descriptionIcon)
        jobAmount.value = ""
        iconClear(amountIcon)
    } 
}

function writeJobs(name, description, amount){
    if(name!="" && description != "" && amount > 0){
        var job = {name, description, amount}
        jobs.push(job)
    }
    $('#jobs').empty()
    if(jobs.length == 0){
        $('#jobs').append('<div id="noJobs" class="margin-btm2"><img src="/assets/imgs/empty.svg"><p class="medium-text medium-weight-text margin0 margin-top2 gray text-center">Para prosseguir é preciso criar<br> ao menos uma vaga.</p></div>')
    }else{
        for(var i=0; i < jobs.length; i++){
            Job = jobs[i]
            $('#jobs').append(`<div class="box margin-btm2"><h1 class="medium-text margin0">${Job.name}</h1><p class="text margin0">${Job.description}</p><p class="text margin0 margin-top1">Qntd. - ${Job.amount}</p><ul class="icons margin-top2"><li class="icon" onclick="deleteJob('${Job.name}')"><img src="/assets/imgs/trash.svg"/></li><li class="icon" onclick="callEditJob('${Job.name}')"><img src="/assets/imgs/pencil.svg"/></li></ul></div>`)
        }
    }
}

function deleteJob(name){
    for(var i=0;i<jobs.length;i++){
        if(jobs[i].name == name){
            jobs.splice(i, 1)
        }
    }
    writeJobs()
}

var JobEdit

function callEditJob(name){
    for(let job of jobs){
        if(job.name == name){
            JobEdit = job
        }
    }
    $('.edit-job').slideDown('slow')
    nameEdit.value = JobEdit.name
    descriptionEdit.value = JobEdit.description
    amountEdit.value = JobEdit.amount
} 

function checksEditJob(){
    var vName = true, vDescription = true, vAmount = true
    if(nameEdit.value.length < 5){
        iconError(nameIconEdit)
        vName = false
    }else iconSuccess(nameIconEdit)
    
    for(let job of jobs){
        if(nameEdit.value == job.name && nameEdit.value != JobEdit.name ){
            iconError(nameIconEdit)
            vName = false
        }
    }

    if(descriptionEdit.value.length < 10){
        iconError(descriptionIconEdit)
        vDescription = false
    }else iconSuccess(descriptionIconEdit)
    if(amountEdit.value < 1){
        iconError(amountIcon)
        vAmount = false
    }else iconSuccess(amountIconEdit)

    if(vName && vDescription && vAmount){
        editJob(nameEdit.value, descriptionEdit.value, amountEdit.value, JobEdit.name)
        $('.edit-job').slideUp('fast')
        nameEdit.value = ""
        iconClear(nameIconEdit)
        descriptionEdit.value = ""
        iconClear(descriptionIconEdit)
        amountEdit.value = ""
        iconClear(amountIconEdit)
        writeJobs()
    } 
}

function editJob(name, description, amount, jobToEdit){
    for(let job of jobs){
        if(job.name == jobToEdit){
            job.name = name 
            job.description = description
            job.amount = amount
        }
    }
}

function checksStep3(){
    if(jobs.length > 0){
        $('.aside-3').slideUp('fast')
        $('.article-event').slideDown('slow')
    }
}

function checksStep4(){
    var vTitle = true, vContent = true
    if(eventTitle.value.length < 10){
        vTitle = false
    }
    if(eventContent.value.length < 300){
        vContent = false
    }
    if(vTitle && vContent){
        casesChecked = getCasesChecked()
        $('#eventTitle').html(eventTitle.value.substring(0,50)+"...")
        $('#eventContent').html(eventContent.value.substring(0,120)+"...")
        $('.cases').html(()=>{
            var html = ""
            for(let Case of casesChecked){
                html += `<li class='case'>${Case}</li>`
            }
            return html
        })
        $('.modal-preview').slideDown('fast')
    } 
}

function getCasesChecked(){
    var checks = []
    for(let Case of cases){
        if(Case.checked){
            checks.push(Case.value)
        }
    }
    return checks
}