# What is Vender Lock In -> 
if we remove our authentication system from backend service also our application is run continously .
# Services 
we export methods from services and whatever happend inside the services we dont' care 
## Race condtion Avoiding 
``` js
function App() {

  const [users , setusers] = useState([])
  const [error , seterror] = useState(false); // always take your error in usestate()
  const [loading , setloading] = useState(false);
  const [search , setsearch] = useState('');
  // interview point

  // we hadle one more case when my req is gone it takes 3 sec and we say that wait our request is gone

  useEffect(() => {
    const controller = new AbortController();
    ;(async() => {
      try {
        setloading(true); // true means our data is load 

        seterror(false) // why we do seterror false here because when error is coming 
        // in catch block seterror(true) makes it true 
        // so when we again make request we do it but our error is still in false state 
        // so we first do seterror(true) here then do our request

        const response = await axios.get('/api/products?search='+search , {
          signal: controller.signal
        })
        console.log(response.data);
        setusers(response.data);
        setloading(false);
      } catch (error) {
        if(axios.isCancel(error)){
          console.log("Request cancelled " , error.message);
          return
        }
        seterror(true);
        setloading(false);
      }

      return() => {
        controller.abort()
      } // cleanup method 
      // if component is mount then unmount the component means if any component have some onclickListener()or eventHandler() then we did not want to as it is 
      // on the componenet ,  by this memory is affetced
      // so by cleanup method we basically unmount the eventhandler method

    })()
  } ,[search]) // -- we make all this custom

  //const {users , error , loading} = customReactQuery('api/products')

  if(error){
    return(
      <h1>Something went wrong while fetching data</h1>
    )
  }
  if(loading){
    return <h1>Loading ............ </h1>
  }
  return (
    <>
      <h1>Chai aur react dev</h1>
      <input type='text' placeholder='Search'
      value={search}
      onChange={(e) => setsearch(e.target.value)}
      />
      <h2>Number of users are ; {users.length}</h2>
    </>
  )
}

export default App
```

/**
 * Race condition
 * So we have a real scenario
 * scenario is that 
 * we have a input text field and when we type something on input field a api call is happen 
 * so on every input word a api call is proceed 
 * so that is race condition
 * but we only intrested in the last api call 
 * suppose we type Shubham
 * so on s an api call we get response
 * on sh an api call we get res
 * on shu an api call we get res
 * on shu an api call we get res
 * 
 * 
 * 
 * on shubham an api call we get res
 * but on all these call we intreseted on the last api response
 * but but on all these api call our performance will kill our ui will badly affected
 * so that's race condition
 *  This solution is for avoiding race condition
 * axios have solution of this 
 * axios uses controller = new AbortController() this cancel the older request by itself if the newer request is hit on the same url of the older request
 * which is send with api call 
 * means when we use axios.get(url , config)it also give config
 * in config we send object {
 *    signal : controller.signal
 * }
 ``` js
const response = await axios.get('/api/products?search='+search , {
          signal: controller.signal
    })
```
 * all those req go to controller with their information
 * so this cancel the older req if the newer req is hit on the same url 
 * and it send those older req in catch block
 * so i catch block we do this
  ``` js
if(axios.isCancel(erro)){
     console.log("Request cancelled " , error.message);
          return
  }
```
 * this code is for avoiding race condition and get response in sequence
 * for cancel the older request we do debouncing 
 */
