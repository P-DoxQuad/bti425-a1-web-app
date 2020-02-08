import React from 'react'

function About() {
    const dateTime = (
        <React.Fragment>
            Today is {new Date().toLocaleDateString}, {new Date().getMonth.toString};
        </React.Fragment>
        
    )

    return (
        <React.Fragment>
            <div>
                <h1>About</h1>
            </div>

            <div>
                <p>Hello, my name is Michael</p>
                <p>{dateTime}</p>
            </div>
        </React.Fragment>
    )
}

export default About;