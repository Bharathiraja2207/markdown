import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Route,Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import { Documentation } from './Documentation';


export default function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <Routes>
      <Route path='/' element={ <MyComponent/> }></Route>
      <Route path='/document' element={ <Documentation/> }></Route>
      </Routes>
       </div>
  )
}

function ButtonAppBar() {
  const navigate=useNavigate()
   return (
     <div  className='navbar'>
     <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static">
         <Toolbar>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
           >
             <MenuIcon />
           </IconButton>
           <Button color="inherit"  onClick={()=>navigate("/")}>Home</Button>
           <Button color="inherit" onClick={()=>navigate("/document")} >Documentation</Button>
         </Toolbar>    
       </AppBar>
      
     </Box>
     </div>
   );
 }


function MyComponent() {
  const list=['#heading 1\n##heading 2\n###heading 3\n####heading 4\n#####heading 5\n---\n> this is quote...\n---\n**This is Bold**\n*This is Italic*\n---\n####order&unorder list:\n1.list 1\n2.list 2\n3.list 3\n- list 1\n\- list 2\n- list 3\n---\n####picture:\n!(https://picsum.photos/536/354)(example)\n[google](https://www.google.com)\n---\n####paragraph:\n$When used as a noun hope only a feeling, but when used as a verb hope becomes the focal point of your motivation.  Sometimes in life all you have is hope.\n####code:\n`<div><h3>this is code..</h3></div>`\n####highlight:\nI need to highlight these =very important words=\n####strike:\n ~The world is flat.~ We now know that the world is round..']
   
  const [markdown, setMarkdown] = useState(`${list}`);
  const [preview, setPreview] = useState('');
  useEffect(() => {
    fetch('https://markdown-node.vercel.app/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown }),
    })
      .then((response) => response.text())
      .then((data) => setPreview(data));
  }, [markdown]);

  function handleChange(event) {
    setMarkdown(event.target.value);
  }
  function handleClearButtonClick() {
    setMarkdown('');
  }

  return (
    
      <div className='parrent'>
        <div className='child1'>
        <textarea className='input_box' value={markdown} onChange={handleChange} />
        <Button  variant="contained" className='clear_button' onClick={handleClearButtonClick}>Clear</Button>
        </div>
      <div className='output_box' dangerouslySetInnerHTML={{ __html: preview }}></div>
      </div>
    
  );
}

 
