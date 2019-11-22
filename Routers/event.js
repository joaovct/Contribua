const express=require( 'express' )
const router=express.Router()
const causesController=require( "../controllers/causesController" )
const actionController=require( "../controllers/actionController" )
const userController=require( "../controllers/userController" )
const vacancyActionController=require( "../controllers/vacancyActionController" )
const ngoController=require( "../controllers/ngoController" )
const feedUtilities=require( '../helpers/feedUtilities' )
const multer=require( "multer" )
const multerConfig=require( "../config/multer" )
const moment=require( "moment" )

router.get( "/", ( req, res ) => {
    return res.render( "ngo/addEventPresentation", { dataHeaderNgo: req.session.ngo, ngos: req.session.ngoUser } )
} )

router.get( "/register", async ( req, res ) => {
    const ngo=req.session.ngo
    const causes=await causesController.listCauses()
    const causesNgo=await causesController.listCausesNgo( req.session.ngo.idNgo )
    const causesNotParticipe=await causesController.listCausesNotParticipeNgo( req.session.ngo.idNgo )
    return res.render( "ngo/addEvent", { dataHeaderNgo: req.session.ngo, causes, causesNgo, causesNotParticipe, ngo } )
} )

router.get( "/:id", async ( req, res ) => {
    const action=await actionController.listOneAction( req.params.id )
    const category=await causesController.listCausesAction( req.params.id )
    let vacancies
    let user
    let ngo

    if ( !req.session.ngo ) {
        dataHeader=req.session.user
        dataHeaderNgo=null
    } else {
        dataHeaderNgo=req.session.ngo
        dataHeader=null
    }
    if ( action ) {
    
        let date = new Date(action.dateAction.toString())
        action.dateStartActionFormatted = moment(date).locale('pt-br').format('D [de] MMM [de] YYYY [às] HH:mm')
        
        date = new Date(action.dateEndAction.toString())
        action.dateEndActionFormatted = moment(date).locale('pt-br').format('D [de] MMM [de] YYYY [às] HH:mm')

        volunteerSubscribed=await actionController.listActionsVolunteer( req.session.user.idVolunteer )
        vacancies=await vacancyActionController.listVacanciesAction( action.idAction )
        user=await userController.listOneUser( action.idVolunteer )
        ngo=await ngoController.listOneNgo( action.idNgo )

        let volunteerVacancies=[ vacancies.length ]

        if ( volunteerSubscribed.length===0 ) {
            for ( let i in vacancies ) {
                volunteerVacancies[ i ]={
                    idVacancyAction: vacancies[ i ].idVacancyAction,
                    nameVacancyAction: vacancies[ i ].nameVacancyAction,
                    descVacancyAction: vacancies[ i ].descVacancyAction,
                    qtdVacancyAction: vacancies[ i ].qtdVacancyAction,
                    isSubscribed: false
                }
            }
        } else {
            for ( let i in vacancies ) {
                for ( let j in volunteerSubscribed ) {
                    volunteerVacancies[ i ]={
                        idVacancyAction: vacancies[ i ].idVacancyAction,
                        nameVacancyAction: vacancies[ i ].nameVacancyAction,
                        descVacancyAction: vacancies[ i ].descVacancyAction,
                        qtdVacancyAction: vacancies[ i ].qtdVacancyAction,
                        isSubscribed: false
                    }
                    if ( vacancies[ i ].idVacancyAction===volunteerSubscribed[ j ].idVacancyAction ) {
                        volunteerVacancies[ i ].isSubscribed=true
                    }
                }
            }
        }
        res.render( 'ngo/event', { action, category, ngo, user, vacancies: volunteerVacancies, dataHeader, dataHeaderNgo, ngos: req.session.ngoUser } )
    } else {
        res.render( 'error', { dataHeader, dataHeaderNgo, ngos: req.session.ngoUser } )
    }
} )

router.get( '/:id/management', async ( req, res ) => {
    let action=await actionController.listOneAction( req.params.id )
    const category=await causesController.listCausesAction( req.params.id )
    let dateStartAction={
        year: action.dateAction.getFullYear(),
        month: await feedUtilities.formatMonthOrDay( action.dateAction.getMonth()+1 ),
        day: await feedUtilities.formatMonthOrDay( action.dateAction.getDate() ),
        hours: moment( action.dateAction ).format( "HH:mm" )
    }
    let dateEndAction={
        year: action.dateEndAction.getFullYear(),
        month: await feedUtilities.formatMonthOrDay( action.dateEndAction.getMonth()+1 ),
        day: await feedUtilities.formatMonthOrDay( action.dateEndAction.getDate() ),
        hours: moment( action.dateEndAction ).format( "HH:mm" )
    }

    dataHeader=req.session.user
    dataHeaderNgo=null
    if ( req.session.ngo ) {
        dataHeaderNgo=req.session.ngo
        dataHeader=null
    }

    if ( !req.session.ngo||req.session.ngo.idNgo!=action.idNgo ) {
        res.render( 'error', { dataHeader, dataHeaderNgo } )
    } else {
        if ( action.isActive ) {
            let vacancies = await vacancyActionController.listVacanciesAction( action.idAction )
            let qtdRemaining = 0
            let idVacancies=vacancies.map( ( vacancy ) => {
                qtdRemaining += vacancy.qtdVacancyAction
                return vacancy.idVacancyAction
            } )
            vacanciesRequests=await vacancyActionController.listVacancyVolunteers( idVacancies )
            vacanciesAccepted=await vacancyActionController.listVacancyVolunteers( idVacancies, true )
            vacanciesRejected=await vacancyActionController.listVacancyVolunteers( idVacancies, false )
            
            vacancies.data = {
                qtdInscriptions: vacanciesAccepted.length,
                qtdRequests: vacanciesRequests.length
            }
            vacancies.data.qtdRemaining = qtdRemaining - vacancies.data.qtdInscriptions
            
            vacancies.individualVacancy = [vacancies.length]

            vacancies.map( (vacancy,i) => {
                let idVacancy = vacancy.idVacancyAction
                let qtdRemaining = vacancy.qtdVacancyAction
                
                vacancies.individualVacancy[i] = { 
                    nameVacancyAction: vacancy.nameVacancyAction,
                    descVacancyAction: vacancy.descVacancyAction,
                    idVacancy: vacancy.idVacancyAction
                }

                vacancies.individualVacancy[i].vacanciesRequests =  vacanciesRequests.map( vr =>{
                    if(vr.idVacancyAction === idVacancy){
                        return vr
                    } 
                })

                vacancies.individualVacancy[i].vacanciesAccepted = vacanciesAccepted.map( va => {
                    if(va.idVacancyAction === idVacancy){
                        return va
                    }
                })

                vacancies.individualVacancy[i].vacanciesRejected = vacanciesRejected.map( vr => {
                    if(vr.idVacancyAction === idVacancy){
                        return vr
                    }
                })
                
                vacancies.individualVacancy[i].vacanciesAccepted.idVacancy = idVacancy
                vacancies.individualVacancy[i].vacanciesRequests.idVacancy = idVacancy
                vacancies.individualVacancy[i].vacanciesRejected.idVacancy = idVacancy

                let filtering = vacancies.individualVacancy[i].vacanciesAccepted.filter(value=>{
                    return value != undefined
                })
                if(filtering.length < 1) vacancies.individualVacancy[i].vacanciesAccepted = []

                filtering = vacancies.individualVacancy[i].vacanciesRequests.filter(value=>{
                    return value != undefined
                })
                if(filtering.length < 1) vacancies.individualVacancy[i].vacanciesRequests = []

                filtering = vacancies.individualVacancy[i].vacanciesRejected.filter(value=>{
                    return value != undefined
                })
                if(filtering.length < 1) vacancies.individualVacancy[i].vacanciesRejected = []
                
                vacancies.individualVacancy[i].qtdInscriptions = vacancies.individualVacancy[i].vacanciesAccepted.length
                vacancies.individualVacancy[i].qtdRequests = vacancies.individualVacancy[i].vacanciesRequests.length
                vacancies.individualVacancy[i].qtdRemaining = qtdRemaining - vacancies.individualVacancy[i].qtdInscriptions
            })

            console.log(vacancies.individualVacancy[0].vacanciesAccepted)

            res.render( 'ngo/eventManagement', { action, dateStartAction, dateEndAction, vacanciesRequests, vacanciesAccepted, vacanciesRejected, category, vacancies, dataHeader, dataHeaderNgo } )
        } else {
            res.render( 'error', { dataHeader, dataHeaderNgo } )
        }
    }
} )

router.post('/:idAction/management/subscribers/:idVacancy', async ( req, res ) => {
    const idAction = req.params.idAction
    const idVacancy = req.params.idVacancy
    let idVacancies
    let qtdRemaining = 0
    if(idVacancy=="null"){
        let action = await actionController.listOneAction( idAction )
        let vacancies = await vacancyActionController.listVacanciesAction( action.idAction )
        idVacancies = vacancies.map( ( vacancy ) => {
            qtdRemaining += vacancy.qtdVacancyAction
            return vacancy.idVacancyAction
        })
    }else{
        let vacancy = await vacancyActionController.listVacancyAction(idVacancy)
        qtdRemaining += vacancy.qtdVacancyAction
        idVacancies = idVacancy
    }
    
    let vacancies = await {
        vacanciesRequests: await vacancyActionController.listVacancyVolunteers( idVacancies ),
        vacanciesAccepted: await vacancyActionController.listVacancyVolunteers( idVacancies, true ),
        vacanciesRejected: await vacancyActionController.listVacancyVolunteers( idVacancies, false ),
        
    }
    vacancies.qtdInscriptions = vacancies.vacanciesAccepted.length,
    vacancies.qtdRequests = vacancies.vacanciesRequests.length,
    vacancies.qtdRemaining = qtdRemaining - vacancies.qtdInscriptions
    res.json(vacancies)
})

router.post( "/:id/edit", multer( multerConfig.action() ).single( 'thumbnail' ), async ( req, res ) => {
    let data=req.body
    let dataPhoto=req.file

    if ( typeof dataPhoto!="undefined" ) {
        await actionController.editPhoto( dataPhoto, req.params.id )
    }
    if ( typeof data.endDate==="undefined" )
        await actionController.editPunctual( data, req.params.id )

    return res.redirect( "/event/"+req.params.id+"/management" )
} )

router.post( "/:id/deactivate", async ( req, res ) => {
    await actionController.deactivate( req.params.id )
    return res.redirect( "/home" )
} )

router.post( "/accept-event", async ( req, res ) => {
    if ( req.query.accepted ) {
        await actionController.acceptSubscribe( req.query.idActionVolunteer )
    }

    if ( req.query.refuse ) {
        await actionController.refuseSubscribe( req.query.idActionVolunteer )
    }
} )

router.post( "/register", multer( multerConfig.action() ).single( 'thumbnail' ), async ( req, res ) => {
    req.body.eventCEP=req.body.eventCEP.replace( /\D/g, "" )
    dataAction=req.body
    dataPhoto=req.file
    dataAction.idVolunteer=req.session.user.idVolunteer

    await actionController.register( dataAction, dataPhoto, req.session.ngo.idNgo )

    return res.redirect( "/home" )
} )

router.post( "/subscribe", async ( req, res ) => {
    if ( req.query.unsubscribe ) {
        res.json( await actionController.unsubscribe( req.session.user.idVolunteer, req.query.idVacancyAction ) )
    } else {
        res.json( await actionController.subscribe( req.session.user.idVolunteer, req.query.idVacancyAction, req.query.idAction ) )
    }
} )

function formatHours( hours, minutes ) {
    let date=( hours<10? "0":'' )+hours+':'+( minutes<10? '0':'' )+minutes
    return date
}

module.exports=router