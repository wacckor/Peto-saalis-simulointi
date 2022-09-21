import React from 'react';


const Form1 = (props) => {
    return (
      
      <form onSubmit={props.addGrid}>
        <table className="maa">
          <tbody>
            <tr>
              <td>Maailman leveys(x):</td><td><input value={props.newGrid_x} 
                        onChange={props.handleGrid_xChange}/></td>
            </tr>
            <tr>
              <td>Maailman pituus(y):</td><td><input value={props.newGrid_y}
                        onChange={props.handleGrid_yChange}/></td>
            </tr>
            <tr>
             <td><button type="submit">Luo uusi maailma!</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    )}
const Form2 = (props) => {
  return (     
        <form onSubmit={props.addPeto}>
          <table className="peto">
            <tbody>
                <tr>
                  <td>Petoeläimen sijainti (x):</td><td><input value={props.newPetoLoc_x}
                          onChange={props.handlePeto_xChange} /></td>
                </tr>
                <tr>
                  <td>Petoeläimen sijainti (y):</td><td><input value={props.newPetoLoc_y}
                          onChange={props.handlePeto_yChange} /></td>
                </tr>
                <tr>
                  <td>Petoeläimen maksimi ikä:</td><td><input value={props.newPetoMax_age}
                          onChange={props.handlePetoMax_ageChange} /></td>
                </tr>
                <tr>
                <td><button type="submit">Lisää uusi petoeläin!</button></td>
                </tr>
            </tbody>
          </table>
        </form> 
    )}
const Form3 = (props) => {
    return (
        <form onSubmit={props.addSaalis}>
          <table className="saalis">
            <tbody>
              <tr>
                <td>Saaliseläimen sijainti (x): </td><td><input value={props.newSaalisLoc_x}
                          onChange={props.handleSaalis_xChange} /></td>
              </tr>
              <tr>
                <td>Saaliseläimen sijainti (y): </td><td><input value={props.newSaalisLoc_y}
                          onChange={props.handleSaalis_yChange} /></td>
              </tr>
              <tr>
                <td>Saaliseläimen maksimi ikä: </td><td><input value={props.newSaalisMax_age}
                          onChange={props.handleSaalisMax_ageChange} /></td>
              </tr>
              <tr>
                <td><button type="submit">Lisää uusi saaliseläin!</button></td>
              </tr>
            </tbody>
          </table>
        </form>
    )}
const Form4 = (props) => {
    return (
        <form onSubmit={props.addKasvi}>
          <table className="kasvi">
            <tbody>
              <tr>
                <td>Kasvin sijainti (x): </td><td><input value={props.newKasviLoc_x}
                            onChange={props.handleKasvi_xChange} /></td>
              </tr>
              <tr>
                <td>Kasvin sijainti (y): </td><td><input value={props.newKasviLoc_y}
                            onChange={props.handleKasvi_yChange} /></td>
              </tr>
              <tr>
                <td>Kasvin maksimi ikä: </td><td><input value={props.newKasviMax_age}
                            onChange={props.handleKasviMax_ageChange} /></td>
              </tr>
              <tr>
                <td><button type="submit">Lisää uusi kasvi!</button></td>
              </tr>
            </tbody>
          </table>
        </form>
    )}
let maailma = document.createElement('div')
            
document.body.append(maailma)

const List = (props) => {
    return(
        <tr>
            <td id="listid">{props.id}</td>
            <td>{props.location_x}</td>
            <td>{props.location_y}</td>
            <td>{props.maxAge}</td>
            <td>{props.age}</td>
            <td>{props.alive}</td>
            <td>{props.loc_x}</td>
            <td>{props.loc_y}</td>
        </tr>       
    )
}
//makeTable-function is used to draw the world and the creatures to the given positions:
const makeTable = (tableData) => {
    const p = '🐺'
    const s = '🐑'
    const k = '🌳'
    return (
      <div>
      
      {'y'}<div id="world" >
  
     <table className="worldClass">
     <tbody>
      {
      
       tableData.map(rowData => {
         return (<tr key={rowData.id}>
             {
              rowData.map(cellData => {
                if(cellData.value === 'P' && cellData.isAlive === true){
                    return (<td key={cellData.id}> {p} </td>);
                }
                if(cellData.value === 'S'){
                    return (<td key={cellData.id}> {s} </td>);
                }
                if(cellData.value === 'K'){
                    return (<td key={cellData.id}> {k} </td>);
                }
                else{
                    //console.log("cell: " + cellData.id)
                    //console.log("rowData: " + rowData.id)
                    return (<td key={cellData.id}> {}</td>);
                }
              })
             }
           </tr>);
       })
       
      }
      <tr>
         <th id="worldX" colSpan={tableData.length}>x</th>
      </tr>
     </tbody>
     </table>
     </div>
     </div>
    )
}

//objectsAsTable function from Mika Murtojärvi:
function objectsAsTable(objArr) {
    if (objArr.length === 0) {
        return makeTable([]);
    }
    //let firstObj = objArr[0];
    let arr = objArr.map(e => Object.values(e));
    //console.log("arr: " + arr)
    return makeTable(arr);
}


class App extends React.Component {
    constructor(props) {
      super(props)
      this.grid = {grid_x : 1,
                  grid_y : 1}
      
      this.state = {
          
        world: [{}],
        worldTable: null,
        peto: [],
        saalis: [],
        kasvi: [],

        newGrid_x: '',
        newGrid_y: '',
        newPetoLoc_x: '',
        newPetoLoc_y: '',
        newPetoMax_age: '',
        newSaalisLoc_x: '',
        newSaalisLoc_y: '',
        newSaalisMax_age: '',
        newKasviLoc_x: '',
        newKasviLoc_y: '',
        newKasviMax_age: '',

        intervalID1 : null,
        intervalID2 : null,
        intervalID3 : null,
        intervalID4 : null
      }
    }
      //event handles:
      handleGrid_xChange = (event) => {
        this.setState({ newGrid_x: event.target.value })
      }
      handleGrid_yChange = (event) => {
        this.setState({ newGrid_y: event.target.value })
      }
      handlePeto_xChange = (event) => {
        this.setState({ newPetoLoc_x: event.target.value })
      }
      handlePeto_yChange = (event) => {
        this.setState({ newPetoLoc_y: event.target.value })
      }
      handlePetoMax_ageChange = (event) => {
        this.setState({ newPetoMax_age: event.target.value })
      }
      handleSaalis_xChange = (event) => {
        this.setState({ newSaalisLoc_x: event.target.value })
      } 
      handleSaalis_yChange = (event) => {
        this.setState({ newSaalisLoc_y: event.target.value })
      }
      handleSaalisMax_ageChange = (event) => {
        this.setState({ newSaalisMax_age: event.target.value })
      }
      handleKasvi_xChange = (event) => {
        this.setState({ newKasviLoc_x: event.target.value })
      }
      handleKasvi_yChange = (event) => {
        this.setState({ newKasviLoc_y: event.target.value })
      }
      handleKasviMax_ageChange = (event) => {
        this.setState({ newKasviMax_age: event.target.value })
      }

//Creatiing the world: world-array stores at the position coordinates if there is somthing. 
//Stores the id of the creature, a value, what is used for the drawing and is the creature alive or not.  
      addGrid = (event) => {
            event.preventDefault()
            
            const gridObject = {
                grid_x: this.state.newGrid_x,
                grid_y: this.state.newGrid_y
            }
            this.grid = gridObject
            //console.log(this.grid)

            let x = this.grid.grid_x
            let y = this.grid.grid_y
            //console.log('from addGrid: ' + x + y)
            let worldArray = [];
            for(let i = 1; i <= y; i++){
                worldArray.push(i);
                worldArray[i] = [];
                for(let j = 1; j <= x; j++){
                    worldArray[i].push(j);
                    //worldArray[i][j] = {id: parseInt(i) + parseInt(j), value: '', isAlive: 'undefined'}
                }
            } 
            //for(let i = 0; i < worldArray[])  
            this.setState({world : worldArray})
            this.setState({worldTable: objectsAsTable(worldArray)})     
        }
  //wraping methods if the given position is over the world:      
        wrapX = (x) => {
                let gridX = this.grid.grid_y
                if (x > gridX){
                    x = x % gridX;   
                }
                if(x === 0){
                    x = gridX;
                }
                if (x < 0){
                    x = (x % gridX) * -1;
                }
              
                //console.log("wrapX: " + x + " gridX: " + gridX)
                return x;
         }
        wrapY = (y) => {
                let gridY = this.grid.grid_x
                if (y > gridY){
                    y = y % gridY;
                }
                if (y === 0){
                    y = gridY;
                }
                if (y < 0){
                    y = (y % gridY) * -1; 
                }  
                //console.log("wrapy: " + y + " gridY: " + gridY)                 
                return y;
        }
  //Gets the coordinates of the new creature:
  //(need's to be done because the positioning is different from the user's view, than the '2D array-view'):
      placeOtus = (x,y) => {
        let otusWorld = []
        let otusPlace = []
        
        for(let i = 1; i <= this.grid.grid_y; i++){
            otusWorld.push(i);
            otusWorld[i] = [];
            
            for(let j = 1; j <= this.grid.grid_x; j++){
                if (i === this.grid.grid_y - x + 1 && j === y){
                    
                    //console.log("ez: " + i + j) 
                    otusPlace = [i,j]
                    otusWorld[i].push(j)
                } 
                else{
                   otusWorld[i].push(parseInt(i)+','+parseInt(j));
                }   
            }
        } 
        return otusPlace
      }
//Add-methods to update the animal's or plant's object and for update the world's object
      addPeto = (event) => {
        event.preventDefault()

        let x = parseInt(this.state.newPetoLoc_y)
        let y = parseInt(this.state.newPetoLoc_x)
        x = this.wrapX(x)
        y = this.wrapY(y)
         
        let petoPlace = this.placeOtus(x,y)
        let petoWorld2 = this.state.world 
        
        x = petoPlace[1]-1
        y = petoPlace[0]

        let ID = () => {
            return '_' + Math.random().toString(36).substr(2, 9)
        }
        let petoObject = {
            id : "Peto" + ID(),
            loc_x : x,
            loc_y : y,
            location_x: x+1,
            location_y: this.grid.grid_y-y+1,
            max_age: this.state.newPetoMax_age, 
            age: 0,
            isAlive: true
        }
        petoWorld2[y][x] = {id: petoObject.id, value:'P',isAlive: petoObject.isAlive}
        //console.log("Itt: " + petoWorld2[y][x].value)
        //console.log("petoWorld petoplace: " + x + y)
       
        
        //console.log("PetoWrap: " + x + y)
        
        this.setState({world: petoWorld2})
        this.setState({worldTable: objectsAsTable(petoWorld2)})
        
        const petot = this.state.peto.concat(petoObject)
        //console.log("id: " + this.state.peto.map(p => p.id))
        //console.log(petot)
        this.setState({peto: petot })
        //console.log(this.state.world)
      }
      addSaalis = (event) => {
        event.preventDefault()

        let x = parseInt(this.state.newSaalisLoc_y)
        let y = parseInt(this.state.newSaalisLoc_x)
        x = this.wrapX(x)
        y = this.wrapY(y)
         
        let saalisPlace = this.placeOtus(x,y)
        let saalisWorld2 = this.state.world 
        
        x = saalisPlace[1]-1
        y = saalisPlace[0]

        let ID = () => {
            return '_' + Math.random().toString(36).substr(2, 9)
        }
        let saalisObject = {
            id : "Saalis" + ID(),
            loc_x : x,
            loc_y : y,
            location_x: x+1,
            location_y: this.grid.grid_y-y+1,
            max_age: this.state.newSaalisMax_age, 
            age: 0, 
            isAlive: true
        }
        saalisWorld2[y][x] = {id: saalisObject.id, value:'S', isAlive: saalisObject.isAlive}
        //console.log("Itt: " + saalisWorld2[y][x].value)
        //console.log("saalisWorld petoplace: " + x + y)
       
        
        //console.log("SaalisWrap: " + x + y)
        
        this.setState({world: saalisWorld2})
        this.setState({worldTable: objectsAsTable(saalisWorld2)})
        
        const saalikset = this.state.saalis.concat(saalisObject)
        //console.log("id: " + this.state.saalis.map(s => s.id))
        //console.log(saalikset)
        this.setState({saalis: saalikset })
        //console.log(this.state.world)
      }

      addKasvi = (event) => {
        event.preventDefault()

        let x = parseInt(this.state.newKasviLoc_y)
        let y = parseInt(this.state.newKasviLoc_x)
        x = this.wrapX(x)
        y = this.wrapY(y)
         
        let kasviPlace = this.placeOtus(x,y)
        let kasviWorld2 = this.state.world 
        
        x = kasviPlace[1]-1
        y = kasviPlace[0]

        let ID = () => {
            return '_' + Math.random().toString(36).substr(2, 9)
        }
        let kasviObject = {
            id : "Kasvi" + ID(),
            loc_x : x,
            loc_y : y,
            location_x: x+1,
            location_y: this.grid.grid_y-y+1,
            max_age: this.state.newKasviMax_age, 
            age: 0, 
            isAlive: true
        }
        kasviWorld2[y][x] = {id: kasviObject.id, value:'K', isAlive: kasviObject.isAlive}
        //console.log("Itt: " + kasviWorld2[y][x].value)
        //console.log("kasviWorld petoplace: " + x + y)
       
        
        //console.log("kasviWrap: " + x + y)
        
        this.setState({world: kasviWorld2})
        this.setState({worldTable: objectsAsTable(kasviWorld2)})
        
        const kasvikset = this.state.kasvi.concat(kasviObject)
        //console.log("id: " + this.state.kasvi.map(k => k.id))
        //console.log(kasvikset)
        this.setState({kasvi: kasvikset })
        //console.log(this.state.world)
      }
  //wraping for moveing is a little bit different because of the positioning issues:
      wrapXMove = (x) => {
        let gridX = this.grid.grid_x
        if (x > gridX){
            x = x % gridX;   
        }
        if(x === 0){
            x = gridX;
        }
        if (x < 0){
            x = (x % gridX) * -1;
        }
      
        //console.log("wrapX: " + x + " gridX: " + gridX)
        return x;
 }
      wrapYMove = (y) => {
              let gridY = this.grid.grid_y
              if (y > gridY){
                  y = y % gridY;
              }
              if (y === 0){
                  y = gridY;
              }
              if (y < 0){
                  y = (y % gridY) * -1; 
              }  
              //console.log("wrapy: " + y + " gridY: " + gridY)                 
              return y;
      }
//Updates the state of the animals after a random step:
      Move = (eläin) => {
           let animal = eläin
           let location_x = Math.floor(Math.random() * (animal.location_x + 2 - animal.location_x + 1)) + animal.location_x -1
           let location_y = Math.floor(Math.random() * (animal.location_y + 2 - animal.location_y + 1)) + animal.location_y -1
           //let location_x = animal.location_x + 1
           //let location_y = animal.location_y
           //console.log("random: " + location_x)
           //console.log("random: " + location_y)
           let x = this.wrapXMove(location_x)
           let y = this.wrapYMove(location_y)
           //let animalPlace = this.placeOtus(x,y)
           //console.log("wrapAnimal: " + x)
           //console.log("wrapAnimal: " + y)
           animal.location_x = x 
           animal.location_y = y
           animal.loc_x = x - 1 
           animal.loc_y = this.grid.grid_y-y+1 
 
           return animal
       
        }
  //First "cleans up" the animal's latest position on the worldTable, then draws it into the new place. 
  //If there is something to eat on the new place die-method is called for that prey:
      updateWorld = (eläin) => {
        
        let newWorld = this.state.world
        
        for(let i = 0; i <= this.grid.grid_y; i++){
          for(let j = 0; j < this.grid.grid_x; j++){
            if (newWorld[i][j] !== undefined && newWorld[i][j].id === eläin.id){
              //console.log("newWorld i: " + i +"j: " + j)
              //console.log("ittezhej1: " + newWorld[i][j])
              newWorld[i][j] = {}
            }
            
          }
        }
        
        //console.log("update x :" + eläin.loc_x + " y: " + eläin.loc_y)
     //console.log("eläin id: " + newWorld[eläin.loc_y][eläin.loc_x].id)
        if(eläin.isAlive && eläin.id.substring(0,5)==="Kasvi"){
          newWorld[eläin.loc_y][eläin.loc_x] = {id: eläin.id, value: 'K', isAlive: true}
        }

        if(eläin.isAlive && eläin.id.substring(0,6)==='Saalis'){
          console.log("Saalis position x: " + eläin.loc_x + " y: "+eläin.loc_y)
          console.log("newWorld saalis: " + eläin.id)
          console.log("Saalis IsAlive: " + eläin.isAlive)
         
          if(newWorld[eläin.loc_y][eläin.loc_x].id && newWorld[eläin.loc_y][eläin.loc_x].id.substring(0,5) === 'Kasvi'){
            let deadKasvi = this.state.kasvi.find(x => x.id === newWorld[eläin.loc_y][eläin.loc_x].id)
            //console.log("deadSaalis: " + deadSaalis.id + deadSaalis.isAlive)
            this.die(deadKasvi)
          }
        
          newWorld[eläin.loc_y][eläin.loc_x] = {id: eläin.id, value: 'S', isAlive: true}
          
        }
       
        if(eläin.isAlive && eläin.id.substring(0,4)==='Peto'){
          console.log("Peto position x: " + eläin.loc_x + " y: " + eläin.loc_y)
          
          if(newWorld[eläin.loc_y][eläin.loc_x].id && newWorld[eläin.loc_y][eläin.loc_x].id.substring(0,6) === 'Saalis'){
            let deadSaalis = this.state.saalis.find(x => x.id === newWorld[eläin.loc_y][eläin.loc_x].id)
            //console.log("deadSaalis: " + deadSaalis.id + deadSaalis.isAlive)
            this.die(deadSaalis)
            
          }
          newWorld[eläin.loc_y][eläin.loc_x] = {id: eläin.id, value: 'P', isAlive: true}
        }
       
        console.log(newWorld)
        this.setState({world: newWorld})
        this.setState({worldTable: objectsAsTable(newWorld)})
      } 
      
   //Everything's dead has to be 'done' in it's own object and in the world's object:   
      die = (otus) => {

        if (otus.isAlive && otus.id.substring(0,6) === 'Saalis'){
            let deadSaalikset = this.state.saalis.map(s => s.id === otus.id ? s.isAlive = false : s)
            this.setState({saalis: deadSaalikset})
          
            let deadWorld = this.state.world
                for(let i = 0; i <= this.grid.grid_y; i++){
                  for(let j = 0; j < this.grid.grid_x; j++){
                    if(deadWorld[i][j] !== undefined && deadWorld[i][j].id === otus.id){
                      console.log("deadWorld i, j : " + deadWorld[i][j].id)
                      deadWorld[i][j].isAlive = false
                    }
                  }
                }
              this.setState({world: deadWorld})
              this.setState({worldTable: objectsAsTable(deadWorld)})
              let saalikset = this.state.saalis.map(s => s.isAlive ? this.Move(s):s)
              this.setState({saalis: saalikset}) 
          }
        if (otus.isAlive && otus.id.substring(0,4) === 'Peto'){
            let deadPetot = this.state.peto.map(p => p.id === otus.id ? p.isAlive = false : p)
            this.setState({peto: deadPetot})
          
            let deadWorld = this.state.world
                for(let i = 0; i <= this.grid.grid_y; i++){
                  for(let j = 0; j < this.grid.grid_x; j++){
                    if(deadWorld[i][j] !== undefined && deadWorld[i][j].id === otus.id){
                      deadWorld[i][j].isAlive = false
                      console.log("deadWorld peto i, j : " + deadWorld[i][j].isAlive)
                    }
                  }
                }
            this.setState({world: deadWorld})
            this.setState({worldTable: objectsAsTable(deadWorld)})
            let petot = this.state.peto.map(p => p.isAlive ? this.Move(p):p)
            this.setState({peto: petot}) 
          }

        if (otus.isAlive && otus.id.substring(0,5) === "Kasvi"){
          let deadKasvit = this.state.kasvi.map(k => k.id === otus.id ? k.isAlive = false : k)
          this.setState({kasvi: deadKasvit})

          let deadWorld = this.state.world
          for(let i = 0; i <= this.grid.grid_y; i++){
            for(let j = 0; j < this.grid.grid_x; j++){
              if(deadWorld[i][j] !== undefined && deadWorld[i][j].id === otus.id){
                console.log("deadWorld i, j : " + deadWorld[i][j].id)
                deadWorld[i][j].isAlive = false
              }
            }
          }
          this.setState({world: deadWorld})
          this.setState({worldTable: objectsAsTable(deadWorld)})
        }

      }
 //Simulointi method for repeat animal's and plnat's move-method, then updates the world
 //and in the same if needed the die-method is called. For ageing the die-method is called  
 //separately   
 //stop the simulation when the world is empty is not yet done.
      simulointi = (event) => {
        event.preventDefault()

       this.intervalID1 = setInterval(() => {
        
          let kasvis = this.state.kasvi
          console.log("kasvikset: " + kasvis.map(x => [x.id, x.isAlive, x.loc_y, x.loc_x]))
          this.setState({kasvi: kasvis})
          this.state.kasvi.map(k => this.updateWorld(k))
          },1000)
        
        this.intervalID2 = setInterval(() => {
          let saalikset = this.state.saalis.map(s => s.isAlive ? this.Move(s) : s)
          this.setState({saalis: saalikset})
          this.state.saalis.map(s => this.updateWorld(s)) 
          
        },1000)

       this.intervalID3 = setInterval(() => {
          let petot = this.state.peto.map(p => p.isAlive ? this.Move(p) : p)
          this.setState({peto: petot})
          this.state.peto.map(p => this.updateWorld(p))
         // let saalikset = this.state.saalis.map(s => s.isAlive ? this.Move(s):s)
         // this.setState({saalis: saalikset}) 
        }, 1000);

     //Ikääntyminen:   
     //one year is 10 steps, the latest lived year is the value of the max_age
        this.intervalID4 = setInterval(() => {

          let saalisVuosi = this.state.saalis
          saalisVuosi.map(s => s.age < s.max_age ? s.age += 1 : this.die(s))
          this.setState({saalis:saalisVuosi})

          let petoVuosi = this.state.peto
          petoVuosi.map(p => p.age < p.max_age ? p.age += 1 : this.die(p))

          let kasviVuosi = this.state.kasvi
          kasviVuosi.map(k => k.age < k.max_age ? k.age += 1 : this.die(k)) 
          this.setState({kasvi: kasviVuosi})
          this.state.kasvi.map(k => this.updateWorld(k))
        },10000)

     //Stop the simulation if the world is empty:
       
        
        //console.log(this.state.world.map(w => w.isAlive))
        //let isEmpty = Object.values(this.state.world).every(x => x === true)
        //setInterval(() => {
        let isEmpty = this.state.world.map(x => Object.values(x))
        let isEmpty2 = isEmpty.find(x => typeof(x) == 'object')
  
        console.log("isEmpty: " + isEmpty)
        console.log("isEmpty2: " + isEmpty2)
       // },1000)
        /*
        if(!this.state.world.includes(this.state.world.isAlive === true)){
          clearInterval(this.intervalID1)
          clearInterval(this.intervalID2)
          clearInterval(this.intervalID3)
          clearInterval(this.intervalID4)
        }
        */
        
      }
      

      render() {
          return(
            <div>
              <div className = "lomake" >
                  <h2>Peto-Saalis-Simulointi</h2>
                  
                        <Form1 addGrid = {this.addGrid} world = {this.state.world.value} newGrid_x = {this.state.newGrid_x} newGrid_y = {this.state.newGrid_y} 
                                        handleGrid_xChange = {this.handleGrid_xChange}  handleGrid_yChange = {this.handleGrid_yChange} ></Form1>             
                        <Form2 addPeto = {this.addPeto} newPetoLoc_x = {this.state.newPetoLoc_x} newPetoLoc_y = {this.state.newPetoLoc_y} 
                                          newPetoMax_age = {this.state.newPetoMax_age} handlePeto_xChange = {this.handlePeto_xChange}
                                          handlePeto_yChange ={this.handlePeto_yChange} handlePetoMax_ageChange = {this.handlePetoMax_ageChange}></Form2>
                        <Form3 addSaalis = {this.addSaalis} newSaalisLoc_x = {this.state.newSaalisLoc_x} newSaalisLoc_y = {this.state.newSaalisLoc_y}
                                          newSaalisMax_age = {this.state.newSaalisMax_age} handleSaalis_xChange = {this.handleSaalis_xChange}
                                          handleSaalis_yChange = {this.handleSaalis_yChange} handleSaalisMax_ageChange = {this.handleSaalisMax_ageChange}></Form3>
                        <Form4 addKasvi = {this.addKasvi} newKasviLoc_x = {this.state.newKasviLoc_x} newKasviLoc_y = {this.state.newKasviLoc_y} 
                                          newKasviMax_age = {this.state.newKasviMax_age} handleKasvi_xChange = {this.handleKasvi_xChange}
                                          handleKasvi_yChange = {this.handleKasvi_yChange} handleKasviMax_ageChange = {this.handleKasviMax_ageChange}
                        ></Form4>
                  
                  
              </div>
              <div id = "maailma">
                 {this.state.worldTable}
              </div>
              
              <div id="simulointi">
                <form onSubmit = {this.simulointi}>
                  <button type="submit">Aloita simulointi!</button>
                </form>
              </div>
              
              <div>
                  <table className = "list">
                    
                      <tbody>
                          <tr>
                            <th>id</th>
                            <th>x</th>
                            <th>y</th>
                            <th>max age</th>
                            <th>age</th>
                            <th>Is alive?</th>
                            <th>c.x</th>
                            <th>c.y</th>
                         </tr>
                        {this.state.peto.map(p => <List key = {p.id} id = {p.id} location_x = {p.location_x} location_y = {p.location_y} loc_x = {p.loc_x} loc_y = {p.loc_y} maxAge = {p.max_age} age = {p.age} alive = {p.isAlive? 'yes':'no'}/>)}
                        {this.state.saalis.map(s => <List key = {s.id} id = {s.id} location_x = {s.location_x} location_y = {s.location_y} loc_x = {s.loc_x} loc_y = {s.loc_y} maxAge = {s.max_age} age = {s.age} alive = {s.isAlive? 'yes':'no'}/>)}
                        {this.state.kasvi.map(k => <List key = {k.id} id = {k.id} location_x = {k.location_x} location_y = {k.location_y} loc_x = {k.loc_x} loc_y = {k.loc_y} maxAge = {k.max_age} age = {k.age} alive = {k.isAlive? 'yes':'no'}/>)}
                      </tbody>
                 </table>
              </div>
              
               
            </div>
          )
      }

}

export default App