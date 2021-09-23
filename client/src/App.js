import React, {createRef, useEffect, useState} from "react";
import axios from 'axios';
import ScrollSnap from 'scroll-snap'
import ReactSnapScroll from "react-snap-scroll";

import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import {portfolioUrl, server} from "./constants";


function callback() {
    console.log('snapped')
}

function App() {
    const [info, setInfo] = useState({
        name: '',
        titles: [],
        image: '',
        about: '',
        skills: {
            platform: [],
            core: [],
            language: [],
            ui: [],
            icons: [],
        },
        socials: [],
        projects: [],
        experiences: [
            {name: "Voluntary", experiences: []},
            {name: "Internship", experiences: []},
        ],
    });
    const [index, setIndex]  = useState(0);

    useEffect(() => {
        axios.get(portfolioUrl)
            .then(({data}) => {
                setInfo(data);
                document.title = `${data.name}`;
            }).catch(error => {
            alert(error);
        });
        // bindScrollSnap();
    }, []);

    // const container = createRef();

    // const bindScrollSnap = () => {
    //     const element = container.current;
    //     const snapElement = new ScrollSnap(element, {
    //         snapDestinationY: '90%',
    //     });
    //
    //     snapElement.bind(callback);
    // }
    const indexChanged = (index) => {
        setIndex(index);
    }
    const children = [
        <Header
            name={info.name}
            titles={info.titles}
            key={1}
        />,
        <About
            image={info.image}
            about={info.about}
            key={2}
        />,
        <Projects
            projects={info.projects}
            key={3}
        />
    ];

    return (
        <>
        {/*<ReactSnapScroll transition='move-top-bottom' indexChanged={indexChanged}>*/}
        {/*     {children.map(child => child)}*/}
            <Header
                name={info.name}
                titles={info.titles}
            />
             <About
                 image={info.image}
                 about={info.about}
                 core={info.skills.core}
             />
             <Projects
                 projects={info.projects}
             />
             <Skills
                 skills={info.skills}
             />
             <Experience
                 experiences={info.experiences}
             />
             <Footer name={info.name} socials={info.socials}/>
         {/*</ReactSnapScroll>*/}
        </>
    );
}

export default App;
