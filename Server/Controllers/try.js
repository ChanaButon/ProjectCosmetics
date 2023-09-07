const a = treatmantList.map((e)=>{
  if(e.TreatmantName===treatmant){
    return true;
  }
})
if(a[0]===true){
  
}
let Treat = {
TreatmantName:treatmant,
Price:price

}
console.log(Treat)
axios.post('http://localhost:3321/treatmant/newTreatmant',Treat).then((res) => {
if (res.data) {
 console.log(res.data);
setTreatmant([...treatmantList,res.data])
console.log(treatmantList)

//עדכון לסטור
// dispatch(setUser(res.data.newProduct))
// navigate("/BusinessLogin",{state:{product}});
}
}).catch((err) => {
console.log(err);
alert("אירעה שגיאה")
})