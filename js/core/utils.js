export default function urlParams()  {
  const query = window.location.search.substring(1)
  const rawVars = query.split("&")
  let params = {}
  rawVars.forEach((v) => {
    let arr = v.split("=")
    let pair = arr.splice(0, 1);
    pair.push(arr.join("="));
    params[pair[0]] = decodeURIComponent(pair[1])
  })
  return params
}