import React, {useRef, useState, useEffect} from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
import Thread from '../components/Thread.js'
import { makeStyles } from '@material-ui/core/styles';
import questionButton from '../Pages/questionButton.module.css'
import ScrollTop from '../components/ScrollTop.js'

export default function SubjectPage() {

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
}));

const [threads, setThreads] = useState([])

 const inputTitleRef = useRef(null);
 let { username, subject } = useParams();

 const submit = () => {

  const title = inputTitleRef.current.value;

  fetch("http://localhost:5000/subject/subject", {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      title: title,
      subject: subject
    }),
  })
    .then(response => response.json())
    .then(newThread => {
      console.log('thread', newThread);
      // 
      setThreads([
        ...threads,
        newThread
      ])
      alert('thread saved !')
    })
    .catch(error => console.log('error', error));
}

useEffect(() => {
  fetch("http://localhost:5000/subject/subject", {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setThreads(result);
    })
    .catch(error => console.log('error', error));
}, []);

  return (
   // <div className={classes.root}>
   <div>
     <div>
       <input className={questionButton["c-checkbox"]} type="checkbox" id="checkbox"/>
          <div className={questionButton["c-formContainer"]}>
            <form className={questionButton["c-form"]} action="">
              <input className={questionButton["c-form__input"]} ref= {inputTitleRef} placeholder="Question" type="text"/>
              <label className={questionButton["c-form__buttonLabel"]} for="checkbox">
                <button className={questionButton["c-form__button"]} type="button" onClick={submit}>Ask</button>
              </label>
              <label className={questionButton["c-form__toggle"]} for="checkbox" data-title="Ask a question"></label>
            </form>
          </div>
     </div>
     <ScrollTop/>
     <h1>
      {threads
        .filter((thread) => {
          console.log(thread.subject)
          return thread.subject === subject
        })
        .map((thread, key) => {
          return(
            <Link to={{pathname: '/subjects/' + username + '/' + thread.subject + '/' + thread.title}} >
              <Thread
              key={key}
              title={thread.title}/>
            </Link>
                )
        })
      }
    </h1>
   </div>
  );   
}