export const getData = async function (store) {

	const dataRequest = await fetch("data/world.json")
	const data = await dataRequest.json()
	store.commit('initializeData',data)
	store.commit("endImport",true)

	return true
}