import axios from 'axios'
const baseDomain = 'http://localhost:3001'
const baseUrl = `${baseDomain}/api/`

export const ApiService = {
    //PRESUPUESTOS FUNCTIONS
    getAllPresupuestos: (author) => axios.get(baseUrl+'getAllPresupuestos/?author='+author).then(res => {
        return res
    }).catch(e => {
        return e
    }),
    getPresupuestoById: (presupuestoId) => axios.get(baseUrl+'getPresupuestoById/?presupuesto='+presupuestoId).then(res => {
        return res
    }).catch(e => {
        return e
    }),
    postPresupuesto:(presupuesto)=>axios.post(baseUrl+'postPresupuesto',{
        presupuesto

    }),
    deletePresupuesto:(presupuestoId)=>axios.put(baseUrl+'deletePresupuesto',{
        presupuestoId

    }),
    postEgreso:(presupuestoId,egreso)=>axios.post(baseUrl+'postEgresoToPresupuesto',{
        presupuestoId,
        egreso

    }),
    updateEgreso:(presupuestoId,egresoUpdated)=>axios.post(baseUrl+'updateEgreso',{
        presupuestoId,
        egresoUpdated
    }),
    deleteEgreso:(presupuestoId,egresoId)=>axios.put(baseUrl+'deleteEgreso',{
        presupuestoId,
        egresoId
    }),
    editEgreso:(presupuestoId,egresoEdited)=>axios.put(baseUrl+'editEgreso',{
        presupuestoId,
        egresoEdited
    }),
    //PRESUPUESTOS FUNCTIONS END
    //AHORROS FUNCTIONS
    getAllAhorros: (author) => axios.get(baseUrl+'getAllAhorros/?author='+author).then(res => {
        return res
    }).catch(e => {
        return e
    }),
    postAhorro:(ahorro)=>axios.post(baseUrl+'postAhorros',{
        ahorro
    }),
    postDineroAhorro:(monto,ahorroId)=>axios.post(baseUrl+'postDineroAhorro',{
        ahorroId,
        monto

    }),
    deleteAhorro:(ahorroId)=>axios.put(baseUrl+'deleteAhorro',{
        ahorroId

    }),
    getMetaById: (metaId) => axios.get(baseUrl+'getMetaById/?meta='+metaId).then(res => {
        return res
    }).catch(e => {
        return e
    }),
    //AUTH
    registrarUser:(user)=>axios.post(baseUrl+'registrarUser',{
        user

    }),
    loginUser:(email,password)=>axios.post(baseUrl+'loginUser',{
        email,
        password
    })


}