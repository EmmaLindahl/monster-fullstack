import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // const [result, setResult] = useState(null)
  const [replacedStory, setReplacedStory] = useState(null)
  const [replacedType, setReplacedType] = useState(null)
  
  const wereWolf = {
    monster: 'werewolf',
    sound: 'Aoooooooooooooooooo!',
    lowSound: 'snarl',
    eyes: 'anger',
    description: 'or fur dark and matted',
    body: 'Every muscle',
    attack: 'bury its teeth deep into your neck'    
  }
  
  const ghoul = {
    monster: 'ghoul',
    sound: 'Eeeeeeeeeeeeeerrrrrrgh!',
    lowSound: 'growl',
    eyes: 'coldness',
    description: 'skin pulled taut',
    body: 'Every sinew',
    attack: 'rip open your ribcage'    
  }
  
  const wraith = {
    monster: 'wraith',
    sound: 'AAAAAAAAAAAAAAAAAAAAA!',
    lowSound: 'shriek',
    eyes: 'anguish',
    description: 'a cloak of shifting smoke',
    body: 'Every ripple',
    attack: 'devour your soul and send it into coldness'    
  }
  
  const [monster, setMonster]= useState(wereWolf)
  const [isMonsterSet, setIsMonsterSet] = useState(false);
  const [page, setPage] = useState(0)

  useEffect(() => {
    const roll = Math.floor(Math.random() * 3) +1
    if(roll === 1){
      setMonster(wereWolf)
    }else if(roll === 2){
      setMonster(ghoul)
    }else if( roll === 3){
      setMonster(wraith)
    }
    setIsMonsterSet(true)
  }, [])

  useEffect(() => {
    if (!isMonsterSet) return;

    fetch('/api')
      .then(response => response.json())
      .then((data) => {
        // setResult(data);

        const modifiedStory = data[page].story
          .replace('${sound}', monster.sound)
          .replace('${eyes}', monster.eyes)
          .replace('${description}', monster.description)
          .replace('${body}', monster.body)
          .replace('${attack}', monster.attack)
          .replace('${monster}', monster.monster)
          .replace('${lowSound}', monster.lowSound);

          const modifiedType = data[page].type
           .replace('${monster}', monster.monster);

        setReplacedStory(modifiedStory);
        setReplacedType(modifiedType)
      });
  }, [isMonsterSet, monster, page]);


  return (
    <>
      <h1>{replacedType ? replacedType : 'Loading...' }</h1>
      <div className="card"><p>{replacedStory ? replacedStory : 'Loading...' }</p></div>
      <div>{page < 2 && <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, 3))}> {page === 0 ? 'Turn around' : 'Run!'}</button>} </div>
    </>
  )
}

export default App
