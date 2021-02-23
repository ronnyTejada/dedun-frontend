import axios from 'axios'
const baseDomain = 'http://localhost:3000'
const baseUrl = `${baseDomain}/api/`

export const ApiService = {
    getAllPresupuestos: () => axios.get(baseUrl+'get').then(res => {
        return res
    }).catch(e => {
        return e
    }),
    postPresupuesto:(presupuesto)=>axios.post(baseUrl+'postPresupuesto',{
        presupuesto

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
    })
}