const loadings = [
  "login_loading",
  "set_profile_loading",
]

export default function handleLoading(l) {
  let loading = false 
  loadings.forEach(load => {
    // console.log("loading", load, l.loadings[load])
    loading = loading || (l.loadings[load] ?? false)
  })
  // console.log("loadings", loading)
  return loading
}