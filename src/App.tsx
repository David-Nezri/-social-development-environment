import * as esbuild from 'esbuild-wasm'
import './App.css';
import { useState  , useEffect , useRef} from 'react';

function App() {
const ref = useRef<any>();
const [input , setInput] = useState('');
const [code , setCode] = useState('');

const startService = async () => {
      ref.current = await esbuild.startService({
        worker:true , 
        wasmURL: '/esbuild.wasm'
      });
     
};

useEffect(() =>{
 startService();
},[])

const onClick = async () => {
    if(!ref.current){
       return;
    }
   const result = await ref.current.transform(input , {
    loader: 'jsx',
    target: 'es2015'
   });
   setCode(result.code);
};

  return (
    <div className="App">
       <div>
        <textarea onChange={(event) => setInput(event.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
       </div>
    </div>
  );
}

export default App;